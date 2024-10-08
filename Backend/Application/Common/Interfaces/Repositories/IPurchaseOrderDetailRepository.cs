﻿using Application.Common.Models;
using Application.PurchaseOrderDetails.Dtos;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Interfaces.Repositories
{
    public interface IPurchaseOrderDetailRepository
    {
        Task<Pagination<PurchaseOrderDetailEntity>> GetFilteredDetails(PurchaseOrderDetailFilters filters);
    }
}
