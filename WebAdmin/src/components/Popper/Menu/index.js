import classNames from 'classnames/bind';
import Styles from './Menu.module.scss';
import Tippy from '@tippyjs/react/headless';
import MenuItem from './MenuItem';
import Wrapper from '../../../../src/components/Popper/wrapper';
//cái wapper gì đây mà jimport từ cái kia ,tại sao dẫn đến Popper là xong. nó sẽ hiểu là lấy file index, tại sao khong chỉ định luôn đến wapper.js,
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(Styles);

const defaultFn = () => {};
function Menu({ children, items = [], onChange = defaultFn, ...props }) {
    //set default neu khong truyen vao hoac truy vao nhung = undfinde/null
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderitems = () => {
        //
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tippy
            delay={[0, 700]}
            offset={[12, 8]}
            placement="bottom-end"
            interactive
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <Wrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title="language"
                                onBack={() => {
                                    setHistory((prev) =>
                                        prev.slice(0, prev.length - 1),
                                    );
                                }}
                            />
                        )}
                        {renderitems()}
                    </Wrapper>
                </div>
            )}
            onHide={() => {
                setHistory((prev) => prev.slice(0, 1));
            }}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
