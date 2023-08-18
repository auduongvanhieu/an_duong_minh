import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Videos.module.scss';
import { faAngleDown, faVideoCamera } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Videos() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('item')}>
                <Link to={'/video'}>
                    <FontAwesomeIcon
                        className={cx('icon')}
                        icon={faVideoCamera}
                    />
                    <span className={cx('text')}>Videos</span>
                    {/* <FontAwesomeIcon className={cx("icondown")} icon={faAngleDown} /> */}
                </Link>
            </div>
        </div>
    );
}

export default Videos;
