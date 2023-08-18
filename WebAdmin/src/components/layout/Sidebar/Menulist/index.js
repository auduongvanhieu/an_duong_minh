import classNames from 'classnames/bind';
import SubMenuList from '../SubMenuList';
import Configurations from './Configurations';
import styles from './Menulist.module.scss';
import Users from './Users';
import Videos from './Videos';

const cx = classNames.bind(styles);

function Menulist() {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('textconten')}>NỘI DUNG</span>
            <div className={cx('listItem')}>
                <Videos />
                <Users />
                {/* <Configurations/> */}
                <SubMenuList />
            </div>
        </div>
    );
}
export default Menulist;
