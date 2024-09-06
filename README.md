# Solución prueba técnica
Para la prueba propuesta realicé un sistema para control de stock. El mismo consta de 3 pasos.

1. Crear la "orden de compra" la cual tendrá el proveedor y la fecha de llegada de pedido, más el detalle de los productos que ingresaran.
2. Crear la orden de recepción para una orden. Cuando ingresemos el código de la orden de compra, se cargaran todos los datos necesarios, y podremos completar la cantidad de unidades por cada producto que ha llegado.
3. Una vez creada la recepicón, la orden de compra desaparece de la lista para visualizar, y se puede visualizar en el modulo "Stocks" que se han aumentado las cantidades de los productos que ingresaron.

Desde el backend pude desarrollarlo completo pero desde el front se puede realizar las siguientes operaciones:
- Para ordenes de compra:
  - Crear
  - Actualizar
  - Eliminar
  - Ver paginado y detalles
  - Filtrar
- Para recepciones:
  - Crear
  - Ver paginado y detalles
- Para stock:
  - Ver paginado
  - Filtrar
