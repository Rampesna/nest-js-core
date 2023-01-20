import { DataSource, DataSourceOptions } from "typeorm";
import * as path from "path";

export const dataSourceOptions: DataSourceOptions =
    {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "nestjscore",
        entities: [path.resolve(__dirname, "../Models/TypeOrm/*{.ts,.js}")],
        synchronize: true
    };

const dataSource = new DataSource(dataSourceOptions);
export default dataSourceOptions;
