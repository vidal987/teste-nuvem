using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nuvem3.Context;
using Nuvem3.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nuvem3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly DataContext _context;

        public ClientController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Client
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetClients()
        {
            return await _context.Clients.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetById(int id)
        {
            var cliente =  await _context.Clients.FindAsync(id);

            if(cliente == null ){
                return NotFound();
            }

            return cliente;
        }


        [HttpGet("filter")]
        public IActionResult Filter(string name, string type)
        {
            var shouldFilterByName = name != string.Empty && name != null;

            var shouldFilterByType = type != string.Empty && type != null;


            var result = Enumerable.Empty<Client>();

            if (shouldFilterByName && shouldFilterByType)
            {
                result = _context.Clients.Where(c => c.Name.Contains(name) && c.Type == type);

            }

            if (shouldFilterByName)
            {
                result = _context.Clients.Where(c => c.Name.Contains(name));

            }

            if (shouldFilterByType)
            {
                result = _context.Clients.Where(c => c.Type == type);

            }

            if (result == null || !result.Any())
            {
                NotFound();
            }


            return Ok(result);
        }


        // PUT: api/Client/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClient(int id, Client client)
        {
            if (id != client.Id)
            {
                return BadRequest();
            }

            _context.Entry(client).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Client
        [HttpPost]
        public async Task<ActionResult<Client>> PostClient(Client client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            return Ok(client);
        }

        // DELETE: api/Client/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClientExists(int id)
        {
            return _context.Clients.Any(e => e.Id == id);
        }
    }
}
