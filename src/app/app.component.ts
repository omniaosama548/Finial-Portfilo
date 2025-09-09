import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProjectsComponent } from "./pages/projects/projects.component";
import { SkillsComponent } from "./pages/skills/skills.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { FooterComponent } from "./pages/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HomeComponent, ProjectsComponent, SkillsComponent, ContactComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myPortfilo';
}
