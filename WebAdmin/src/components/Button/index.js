import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);
function Button({
    to,
    href,
    children = false,
    outline = false,
    primary = false,
    small = false,
    rounded = false,
    disabbed = false,
    large = false,
    text = false,
    leftIcon,
    rightIcon,
    Buttonst,
    onClick,
    className,
    ...passprops
}) {
    console.log(primary);
    let Comp = 'button';
    const props = {
        onClick,
        ...passprops,
    };
    // remove evnt listener when btn is disabbed
    if (disabbed) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', className, {
        primary,
        outline,
        small,
        large,
        text,
        disabbed,
        rounded,
        leftIcon,
        // Buttonst,
    });
    console.log(classes);
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}> {children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
