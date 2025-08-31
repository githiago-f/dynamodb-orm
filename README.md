# DynamoDB-ORM

## Framework for domain driven modeling

### Define your aggregates

```ts
@AggregateRoot()
abstract class AggregateRoot {
  @PartitionKey()
  public abstract pk: PK<string>;
}
```

### Define your entities

```ts
@Entity()
class Entity extends AggregateRoot {
  public readonly keyProperty: Key<string>;
  public readonly nonKeyProperty: string;

  get pk() {
    return `ENTITY_NAME#${this.keyProperty}`;
  }
}

@Entity()
class Entity2 extends AggregateRoot {
  public readonly anotherKeyProp: Key<string>;

  get pk() {
    return `ENTITY2_NAME#${this.anotherKeyProp}`;
  }
}
```

### Define a lifecycle

```ts
class EntitiyRespository extends Repository<AggregateRoot> {}

class AggregateService {}
```

##
