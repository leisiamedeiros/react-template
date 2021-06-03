import React, { ChangeEvent } from 'react';
import { Redirect } from 'react-router-dom';

interface ComponentModelState<S> {
    payload: S,
    isLoading: boolean,
    redirectTo: string,
    isRedirecting: boolean,
    errors: any[];
    statusMessage: string;
    showAlert: boolean;
}
export abstract class MainComponent<S = any, P = any> extends React.Component<P, ComponentModelState<S>> {

    initialState: ComponentModelState<S>;

    constructor(props: P, model?: S) {
        super(props);

        this.initialState = {
            payload: model ? Object.assign({}, model) as S : {} as S,
            isLoading: false,
            redirectTo: '/',
            isRedirecting: false,
            errors: [],
            statusMessage: '',
            showAlert: false
        };

        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxListChange = this.handleCheckboxListChange.bind(this);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(s => {
            let model: any = { ...s.payload };
            model[name] = value;
            return { ...s, payload: model };
        });
    }

    handleCheckboxListChange(event: ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const checked = target.checked;
        const name = target.name;
        const value = target.value;

        let model: any = { ...this.state.payload };
        if (!model[name]) {
            model[name] = [];
        }

        let index = model[name].indexOf(value);
        if (checked && index === -1) {
            model[name].push(value);
        }
        if (!checked && index != -1) {
            model[name].splice(index, 1);
        }

        this.setState({ ...this.state, payload: model });
    }

    hasKeyError(key: string): boolean {
        let found = false;

        this.state.errors.forEach(x => {
            if (x.key === key.toLowerCase()) found = true;
        });

        return found;
    }

    getErrorByKey(key: string, defaultValue: string): string {
        let error = defaultValue;

        this.state?.errors.forEach(el => {
            if (el.key === key.toLowerCase()) error = el.value;
        });

        return error;
    }

    async setError(key: string, value: string) {
        this.setState(s => {
            let e = s.errors;
            e.push({ key: key.toLowerCase(), value: value });
            return { ...s, errors: e };
        });
    }

    hasErrors(): boolean {
        return this.state.errors.length > 0;
    }

    async clearErrors() {
        this.setState({ errors: [] });
    }

    hideAlert(seconds: number = 4000) {
        setTimeout(() => {
            this.setState({
                showAlert: false
            })
        }, seconds);
    }

    async clearMessages() {
        this.setState({ statusMessage: '' });
    }

    async redirectTo(uri: string) {
        this.setState({ isRedirecting: true, redirectTo: uri });
    }

    abstract build(): JSX.Element;

    render(): JSX.Element {
        if (this.state.isRedirecting) {
            return <Redirect to={this.state.redirectTo} />;
        }
        return this.build();
    }
}
