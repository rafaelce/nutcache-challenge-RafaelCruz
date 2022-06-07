using Domain;
using FluentValidation;

namespace Application.Employees
{
    public class EmployeeValidator : AbstractValidator<Employee>
    {
        // Utilized Fluent to Data validation.
        public EmployeeValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.BirthDate).NotEmpty();
            RuleFor(x => x.Gender).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.CPF).NotEmpty();
            RuleFor(x => x.StartDate).NotEmpty();
        }
    }
}