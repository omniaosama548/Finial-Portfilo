// contact.component.ts
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    // Reset messages
    this.successMessage = '';
    this.errorMessage = '';

    if (this.contactForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly!';
      this.markFormGroupTouched(this.contactForm);
      return;
    }

    this.isSubmitting = true;

    // Simulate form submission (replace with your actual API call)
    this.http.post('https://backend-portfilo-seven.vercel.app/contact', this.contactForm.value)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Message sent successfully! I\'ll get back to you soon.';
          this.errorMessage = '';
          this.contactForm.reset();
          this.isSubmitting = false;

          // Auto-hide success message after 5 seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        error: (err) => {
          this.errorMessage = 'Something went wrong, please try again.';
          this.successMessage = '';
          this.isSubmitting = false;
          console.error('Contact form error:', err);

          // Auto-hide error message after 5 seconds
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      });
  }

  // Helper method to mark all fields as touched (for validation display)
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  // Getter methods for easy access in template
  get nameControl() {
    return this.contactForm.get('name');
  }

  get emailControl() {
    return this.contactForm.get('email');
  }

  get messageControl() {
    return this.contactForm.get('message');
  }

  // Method to check if a field has errors and is touched
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.hasError(errorType) && field.touched : false;
  }

  // Method to get field error message
  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        const minLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} must be at least ${minLength} characters`;
      }
    }
    return '';
  }

  // Helper method to get display name for fields
  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      'name': 'Name',
      'email': 'Email',
      'message': 'Message'
    };
    return displayNames[fieldName] || fieldName;
  }
}
