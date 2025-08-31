import "reflect-metadata";
import { builder } from "./builder";
import { map } from "./lib/data/mapper";
import { PK } from "./utils/types/keys";
import { ByteSet } from "./lib/modeling/set-annotations";
import { Entity } from "./lib/modeling/entity";
import { PartitionKey } from "./lib/modeling/key";
import { SaveAs } from "./lib/modeling/save-as";

// modeling
abstract class Invoices {
  @PartitionKey()
  @SaveAs("_pk")
  abstract readonly partitionKey: PK<string>;
}

enum Status {
  PAGO = "PAGO",
  EM_ABERTO = "EM_ABERTO",
  FECHADO = "FECHADO",
  CANCELADO = "CANCELADO",
}

@Entity()
class Charge extends Invoices {
  @SaveAs("_ci")
  public readonly clientIdentity: string;
  public readonly status: Status;
  public readonly value: number;
  public readonly enabled: boolean;

  public readonly myMap: Record<string, string>;

  @ByteSet()
  public readonly mySets: Uint8Array[];

  get partitionKey() {
    return `CHARGE#${this.clientIdentity}`;
  }
}

const charge = builder(Charge)
  .clientIdentity("100000001")
  .status(Status.EM_ABERTO)
  .enabled(false)
  .value(3000)
  .mySets([new Uint8Array([12, 2, 434, 53]), new Uint8Array([12, 22, 0, 53])])
  .myMap({ chave: "valor" })
  .build();

console.log(map(charge));
