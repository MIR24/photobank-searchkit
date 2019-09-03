import * as React from 'react';

class CustomDialog extends React.Component<{
    open: boolean;
    title?: string;
    actions?: any;
}, any> {
    componentDidUpdate (prevProps) {
        if (this.props.open !== prevProps.open) {
            var body = document.body;
            if (this.props.open === true) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'scroll';
            } 
        }
    }

    render () {
        if (this.props.open) {
            return (
                <div className="mc-back">
                    <div className="mc-inner">
                        <div className="mc-title">
                            <h3>{this.props.title}</h3>
                        </div>
                        <div className="mc-actions">{this.props.actions}</div>
                    </div>
                </div>
            )
        }
        return null;
    }
}

export default CustomDialog;