using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Employees
{
    public class Detals
    {
        public class Query : IRequest<Result<Employee>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Employee>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context) => _context = context;

            public async Task<Result<Employee>> Handle(Query request, CancellationToken cancellationToken)
            => Result<Employee>.Success(await _context.Employees.FindAsync(request.Id));

        }
    }
}