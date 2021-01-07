export class PostReturns{
    id = '';
    title = '';
    body = '';
    domainName = '';
    username = '';
    totalLikes = 0;
    hasLiked = false;
    totalComments = 0;
    comments: any [] = [
      {
        id: '',
        body: '',
        username: '',
        postId: '',
        totalLikes: 0,
        hasLiked: true,
        createdAt: '',
        modifiedAt: ''
      }
    ];
    createdAt = '';
    modifiedAt = '';
  }

