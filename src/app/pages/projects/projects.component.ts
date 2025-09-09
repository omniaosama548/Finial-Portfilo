import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
interface Project {
  _id: string;
  title: string;
  description: string;
  liveLink?: string;
  gitHubLink: string;
  image: string;
 }

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule, HttpClientModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.http.get<Project[]>('https://backend-portfilo-seven.vercel.app/projects')
      .subscribe({
        next: (data) => {
          this.projects = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load projects';
          this.loading = false;
          console.error('Error fetching projects:', err);
        }
      });
  }

  getFullImageUrl(imagePath: string): string {
    return `http://localhost:5000${imagePath}`;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
