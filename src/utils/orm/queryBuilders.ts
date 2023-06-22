import { apiPostThunksAsync } from "./thunks";

interface QueryCondition {
  field: string;
  operator: string;
  value: any;
}

interface OrderBy {
  field: string;
  direction: 'asc' | 'desc';
}

interface Join {
  table: string;
  column: string;
  join: string;
}

interface ColumnValue {
  column: string;
  value: any;
}

class QueryBuilders {
  // @ts-ignore
  private model: string;
  private query: {
    table: string;
    select: any;
    where: QueryCondition[];
    orderBy: OrderBy | null;
    limit: number | null;
    join: Join[];
    offset: number | null;
    create: ColumnValue[] | null;
    update: ColumnValue[] | null;
    schema: string | null;
  };

  constructor(model: string) {
    this.model = model;
    this.query = {
      table: model,
      select: null,
      where: [],
      orderBy: null,
      limit: null,
      join: [],
      offset: null,
      schema:'',
      create: null,
      update: null,
    };
  }

  select(fields: string | string[]): QueryBuilders {
    this.query.select = Array.isArray(fields) ? fields.join(', ') : fields;
    return this;
  }

  schema(name: string): QueryBuilders {
    this.query.schema = name
    return this
  }

  where(field: string, operator: string, value: any): QueryBuilders {
    this.query.where.push({ field, operator, value });
    return this;
  }

  orderBy(field: string, direction: 'asc' | 'desc' = 'asc'): QueryBuilders {
    this.query.orderBy = { field, direction };
    return this;
  }

  limit(count: number): QueryBuilders {
    this.query.limit = count;
    return this;
  }

  join(table: string, column: string, join: any): QueryBuilders {
    this.query.join.push({ table, column, join });
    return this;
  }

  create(values: { [key: string]: any }): QueryBuilders {
    const insertValues: ColumnValue[] = Object.entries(values).map(([column, value]) => ({ column, value }));
    this.query.create = insertValues;
    return this;
  }

  update(values: { [key: string]: string | number }): QueryBuilders {
    const updateValues: ColumnValue[] = Object.entries(values).map(([column, value]) => ({ column, value }));
    this.query.update = updateValues;
    return this;
  }

  async get(): Promise<object> {
    const getData = await apiPostThunksAsync(this.query);
    return getData;
  }

  async paginate(page: number, perPage: number): Promise<string> {
    const offset = (page - 1) * perPage;
    this.query.offset = offset;
    this.query.limit = perPage;
    const getData = await apiPostThunksAsync(this.query);
    return getData;
  }

  async delete(): Promise<object> {
    this.query['delete'] = true
    const getData = await apiPostThunksAsync(this.query);
    return getData;
  }

  async save(): Promise<object> {
    const getData = await apiPostThunksAsync(this.query);
    return getData;
  }


}

export { QueryBuilders }