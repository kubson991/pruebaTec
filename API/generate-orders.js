import fs from 'fs'

const suppliers = [
  'Tecnologia SAS',
  'Servicios Cloud SAS',
  'Marketing Pro',
  'Consultoría IT',
  'Logística Express',
  'Data Solutions',
  'Inversiones Andinas',
  'Constructora Atlas',
  'Finanzas Group',
  'Software Colombia',
  'Telecom SAS',
  'Distribuciones Omega',
]

const concepts = [
  'Compra de equipos',
  'Infraestructura AWS',
  'Campaña digital',
  'Asesoría tecnológica',
  'Envío de productos',
  'Licencias de software',
  'Servicios de soporte',
  'Mantenimiento preventivo',
  'Consultoría financiera',
  'Capacitación empresarial',
]

const statuses = [
  'BORRADOR',
  'APROBADA',
  'RECHAZADA',
  'PAGADA',
]

const randomItem = (array) => {
  return array[
    Math.floor(Math.random() * array.length)
  ]
}

const randomAmount = () => {
  return Math.floor(
    Math.random() * (8000000 - 100000) + 100000
  )
}

const randomDate = () => {
  const start = new Date(2026, 0, 1)
  const end = new Date(2026, 11, 31)

  const date = new Date(
    start.getTime() +
      Math.random() * (end.getTime() - start.getTime())
  )

  return date.toISOString().split('T')[0]
}

const paymentOrders = Array.from(
  { length: 175 },
  (_, index) => ({
    id: index + 1,

    supplierName: randomItem(suppliers),

    amount: randomAmount(),

    concept: randomItem(concepts),

    createdAt: randomDate(),

    status: randomItem(statuses),
  })
)

const data = {
  paymentOrders,
}

fs.writeFileSync(
  './mock/db.json',
  JSON.stringify(data, null, 2)
)

console.log(
  'db.json generado con 120 órdenes'
)