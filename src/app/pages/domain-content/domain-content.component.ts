import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from '../../shared/security/auth-services.service';
import { DomainPosts } from '../../shared/models/domain-posts';
import { NewPost } from '../../shared/models/new-post';
import { PostReturns } from '../../shared/models/post-returns';

@Component({
  selector: 'app-domain-content',
  templateUrl: './domain-content.component.html',
  styleUrls: ['./domain-content.component.css']
})
export class DomainContentComponent implements OnInit {

  post: NewPost = new NewPost();
  newPost: DomainPosts = new DomainPosts();
  newPostReturn: PostReturns = new PostReturns();
  name = '';
  domainPosts: any[] = [];
  postsLength = 0;
  displayComments = false;
  postSubmitted = false;
  likesUpdated = false;

  constructor(private route: ActivatedRoute,
              private authService: AuthServicesService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params.name;
    this.authService.getPostsOfADomain(this.name).subscribe(
      data => {
        this.postsLength = data.length;
        this.domainPosts = data;
      }
    );
  }

  create(form: NgForm): void{
    if (form.valid){
      this.post.domainName = this.name;
      this.authService.createPost(this.post).subscribe(
        data => {
          this.newPost = data;
          this.postSubmitted = true;
          this.authService.getPostsOfADomain(this.name).subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            data => {
              this.postsLength = data.length;
            }
          );
          this.post.body = '';
          this.post.title = '';
          this.toastr.success('Post Created', 'Success');
        }
      );
    }
    else{
      this.toastr.error('Please fill both title and body', 'Error');
    }
  }


  postLike(postId: string): void{
    this.authService.likePost(postId).subscribe(
      data => {
        this.newPostReturn = data;
        this.likesUpdated = true;
        console.log('Updated');
      }
    );
  }


}
