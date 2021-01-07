import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostReturns } from '../../shared/models/post-returns';
import { AuthServicesService } from '../../shared/security/auth-services.service';
import { CommentReturn } from '../../shared/models/comment-return';
import { PostComment } from '../../shared/models/post-comment';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.css']
})
export class PostContentComponent implements OnInit {

  newComment: CommentReturn = new CommentReturn();
  postComment: PostComment = new PostComment();
  postId = '';
  postDetails: PostReturns = new PostReturns();
  commentDetails: any[] = [];
  commentPosted = false;

  constructor(private route: ActivatedRoute,
              private authService: AuthServicesService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params.id;
    this.authService.getPost(this.postId).subscribe(
      data => {
        this.postDetails = data;
        this.commentDetails = data.comments;
      }
    );
  }

  createComment(form: NgForm): void{
    if (form.valid){
      this.postComment.postId = this.postId;
      this.authService.postComment(this.postComment).subscribe(
        data => {
          this.newComment = data;
          this.commentPosted = true;
        }
      );
      this.toastr.success('Comment Posted', 'Success');
      this.postComment.body = '';
    }
    else{
      this.toastr.error('Comment can\'t be blank', 'Error');
    }
  }

}
