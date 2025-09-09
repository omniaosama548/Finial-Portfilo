// footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  // Navigation links
  navigationLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  // Social media links
  socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/omnia-osama-6754b3206/',
      icon: 'linkedin',
      hoverColor: 'hover:text-blue-400'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/omniaosama548',
      icon: 'github',
      hoverColor: 'hover:text-gray-300'
    },
    {
      name: 'Email',
      href: 'anaomnia47@gmail.com',
      icon: 'email',
      hoverColor: 'hover:text-red-400'
    },
    {
      name: 'instagram',
      href: 'https://www.instagram.com/omniaosama2002/',
      icon: 'instagram',
      hoverColor: 'hover:text-green-400'
    }
  ];

  // Contact information
  contactInfo = [
    {
      icon: 'email',
      text: 'anaomnia47@gmail.com'
    },
    {
      icon: 'location',
      text: 'Cairo, Egypt'
    },
    {
      icon: 'status',
      text: 'Available for work'
    }
  ];

  constructor() {}

  // Method to handle navigation clicks (if using Angular Router)
  onNavigate(link: string): void {
    // You can implement smooth scrolling or router navigation here
    if (link.startsWith('#')) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // Method to open social links
  openSocialLink(url: string): void {
    window.open(url, '_blank');
  }
}
