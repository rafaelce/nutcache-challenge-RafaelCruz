using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Employees
{
    public class Edit
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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var employee = await _context.Employees.FindAsync(request.Employee.Id);

                if (employee == null) return null;

                _mapper.Map(request.Employee, employee);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update activity.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}