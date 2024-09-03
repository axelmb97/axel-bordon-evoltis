using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Models
{
    public class Pagination<T>
    {
        public List<T> Items { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public bool HasNextPage { get; set; }

        public Pagination(List<T> items, int totalItems, int page, int pageSize)
        {
            Items = items;
            TotalItems = totalItems;
            TotalPages = CalculateTotalPages(totalItems, pageSize);
            HasNextPage = CalculateHasNextPage(page);

        }

        private int CalculateTotalPages(int totalItems, int pageSize)
        {

            decimal pages = (decimal)totalItems / pageSize;
            int total = (int)Math.Ceiling(pages);
            return total;
        }

        private bool CalculateHasNextPage(int page)
        {
            return page < TotalPages;
        }
    }
}
