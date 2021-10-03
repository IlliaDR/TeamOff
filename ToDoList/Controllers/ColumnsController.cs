﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoList;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColumnsController : ControllerBase
    {
        private readonly ToDoDBContext _context;

        public ColumnsController(ToDoDBContext context)
        {
            _context = context;
        }

        // GET: api/Columns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Columns>>> GetColumns()
        {
            return await _context.Columns.ToListAsync();
        }

        // GET: api/Columns/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Columns>> GetColumns(int id)
        {
            var columns = await _context.Columns.FindAsync(id);

            if (columns == null)
            {
                return NotFound();
            }

            return columns;
        }

        // PUT: api/Columns/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutColumns(int id, Columns columns)
        {
            if (id != columns.ColumnId)
            {
                return BadRequest();
            }

            _context.Entry(columns).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ColumnsExists(id))
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

        // POST: api/Columns
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Columns>> PostColumns(Columns columns)
        {
            _context.Columns.Add(columns);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetColumns", new { id = columns.ColumnId }, columns);
        }

        // DELETE: api/Columns/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Columns>> DeleteColumns(int id)
        {
            var columns = await _context.Columns.FindAsync(id);
            if (columns == null)
            {
                return NotFound();
            }

            _context.Columns.Remove(columns);
            await _context.SaveChangesAsync();

            return columns;
        }

        private bool ColumnsExists(int id)
        {
            return _context.Columns.Any(e => e.ColumnId == id);
        }
    }
}
