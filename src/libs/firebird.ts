import Firebird from 'node-firebird';


export class FB {

    constructor(private connectionParams: any) { }

    public dBselect(arr: any): any {
        return new Promise((resolve, reject) => {
            Firebird.attach(this.connectionParams, function (err: any, db: any) {
                if (err)
                    throw (err);
                for (let index = 0; index < arr.length; index++) {
                    db.query(arr[index].query, arr[index].params, function (err: any, result: any) {
                        db.detach();
                        if (err)
                            return reject(err);

                        return resolve(result);
                    });
                }
            })
        });
    }
    public dBexec(arr: any): any {
        return new Promise((resolve, reject) => {
            Firebird.attach(this.connectionParams, function (err: any, db: any) {
                if (err)
                    throw (err);

                db.transaction(Firebird.ISOLATION_READ_COMMITED, function (err: any, transaction: any) {
                    if (err)
                        throw (err);

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
