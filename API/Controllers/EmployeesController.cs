using System;
using System.Threading.Tasks;
using Application.Employees;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EmployeesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        => HandleResult(await Mediator.Send(new List.Query()));

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployees(Guid id)
                   => HandleResult(await Mediator.Send(new Detals.Query { Id = id }));

        [HttpPost]
        public async Task<IActionResult> CreateEmployees(Employee employee)
        => HandleResult(await Mediator.Send(new Create.Command { Employee = employee }));

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        => HandleResult(await Mediator.Send(new Delete.Command { Id = id }));

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Employee employee)
        {
            employee.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Employee = employee }));
        }
    }
}