using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Employees
{
    public class List
    {
        public class Query : IRequest<Result<List<Employee>>> { }
        public class Handler : IRequestHandler<Query, Result<List<Employee>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context) => _context = context;
            public async Task<Result<List<Employee>>> Handle(Query request, CancellationToken cancellationToken)
            => Result<List<Employee>>.Success(await _context.Employees.ToListAsync());
        }
    }
}