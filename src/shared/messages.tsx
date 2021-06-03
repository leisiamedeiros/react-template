import React, { Component, Fragment } from 'react'

{/* <Alerts items={this.state.errors} onClose={() => this.clearErrors()} /> */ }

export default class Messages extends Component<any, any> {

    render() {
        let items = this.props.items.filter((item: any) => item.key === 'error');

        if (items <= 0) return <Fragment></Fragment>
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="alert alert-danger" role="alert">
                        <div>
                            <strong className="text-danger">Ops!!!</strong>
                            <button type="button" className="btn-close"
                                data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        <hr />
                        {
                            this.state.errors.map((item: any, index: number) =>
                                <div key={index} className="text-danger">
                                    {item.value}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

}
