import { builder } from "./builder";

// utils
function PartitionKey(): PropertyDecorator {
  return () => { };
}

function SortKey(): PropertyDecorator {
  return () => { };
}

function Entity(): ClassDecorator {
  return () => { };
}

type Key<T extends string | number> = T;

// modeling
abstract class Invoices {
  @PartitionKey()
  abstract readonly pk: Key<string>;
}

enum Status {
  PAGO,
  EM_ABERTO,
  FECHADO,
  CANCELADO
}

@Entity()
class Charge extends Invoices {
  public readonly uc: Key<string>;
  public readonly status: Status;
  public readonly value: number;

  get pk() {
    return `CHARGE#${this.uc}`;
  }

  cancel() {
    return builder(Charge)
      .value(this.value)
      .uc(this.uc)
      .status(Status.CANCELADO)
      .build();
  }
}

// repository
const charge = builder(Charge).uc('100000001')
  .value(3000)
  .status(Status.EM_ABERTO)
  .build();

console.log(charge);
console.log(charge.cancel());
console.log(charge);
