import { Component, OnInit } from '@angular/core';
import { GithubService } from './github.service';
import { Repository, User } from './repository.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  username = '';
  user: User;
  repositories: Repository[] = [];
  selectedRepository: Repository | null = null;
  userNotFound: boolean = false;

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
    const savedRepositories = localStorage.getItem('repositories');
    if (savedRepositories) {
      this.repositories = JSON.parse(savedRepositories);
    }
  }

  searchUserOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchUser();
    }
  }

  searchUser() {
    this.selectedRepository = null;
    this.userNotFound = false;
    this.githubService.getUser(this.username).subscribe((data: User) => {
      this.user = data;
      
      localStorage.setItem('currentUser', JSON.stringify(this.user));
    },
    (error) => {
      if (error.status === 404) {
        this.userNotFound = true;
      }
    }
    );

    this.githubService.getRepositories(this.username).subscribe((data: Repository[]) => {
      this.repositories = data;
      localStorage.setItem('repositories', JSON.stringify(this.repositories));
    });

    this.username = '';
  }

  showRepositoryDetails(repo: Repository) {
    this.selectedRepository = repo;
  }
}
