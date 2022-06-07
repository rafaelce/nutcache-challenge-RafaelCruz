using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Employees
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Employee Employee { get; set; }
        }

        public class CommadValidator : AbstractValidator<Command>
        {
            public CommadValidator()
            {
                RuleFor(x => x.Employee).SetValidator(new EmployeeValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Employees.Add(request.Employee);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create Employee");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}