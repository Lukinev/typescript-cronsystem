import Firebird from 'node-firebird';


export class FB {

    constructor(private connectionParams: any) { }

    public DBselect(): any {
        return new Promise((resolve, reject) => {
            Firebird.attach(this.connectionParams, function (err: any, db: any) {
                if (err)
                    throw (err);
                db.query('SELECT * FROM tbl union all SELECT * FROM tbl', [], function (err: any, result: any) {
                    db.detach();
                    if (err)
                        return reject(err);

                    return resolve(result);
                });
            })
        });
    }
    public DBexec(arr: any): any {
        return new Promise((resolve, reject) => {
            Firebird.attach(this.connectionParams, function (err: any, db: any) {
                if (err)
                    throw err;

                db.transaction(Firebird.ISOLATION_READ_COMMITED, function (err: any, transaction: any) {
                    for (let index = 0; index < arr.length; index++) {
                        transaction.query(arr[index].query, arr[index].params, function (err: any, result: any) {
                            if (err) {
                                transaction.rollback();
                                return reject(err);
                            }

                            transaction.commit(function (err: any) {
                                if (err) {
                                    transaction.rollback();
                                    return reject(err);
                                }
                                else {
                                    return resolve(result);
                                }
                            });
                        });
                    }
                    db.detach();
                })
            });

        }).catch(error => {
            console.log(error);
        });
    }
};
