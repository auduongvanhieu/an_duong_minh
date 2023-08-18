import classNames from 'classnames/bind';
import Color from './Color';
import Display from './Display';
import Layout from './Layout';
import styles from './SubMenuList.module.scss';

const cx = classNames.bind(styles);
function SubMenuList() {
    return (
        <div className={cx('wrapper')}>
            {/* <span className={cx('title')}>CÀI ĐẶT NÂNG CAO</span> */}
            <div className={cx('listcomp')}>
                {/* <Display />
                <Layout />
                <Color /> */}
            </div>
        </div>
    );
}
export default SubMenuList;
