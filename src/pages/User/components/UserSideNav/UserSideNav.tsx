import { faFileInvoiceDollar, faLock, faPen, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/contexts/path'
import { getAvatarUrl } from 'src/utils/utils'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-black'>
          <img
            className='w-full h-full object-cover rounded-full'
            src={getAvatarUrl(profile?.avatar as string)}
            alt={profile?.name}
          />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>Vũ Hồng Lĩnh</div>
          <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
            <FontAwesomeIcon icon={faPen} size='sm' />
            <span className='ml-1'>Sửa hồ sơ</span>
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center capitalize  transition-colors', {
              'text-orange': isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <FontAwesomeIcon icon={faUser} size='sm' style={{ color: '#80888e' }} />
          </div>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to={path.ChangePassword}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center capitalize  transition-colors', {
              'text-orange': isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <FontAwesomeIcon icon={faLock} size='sm' style={{ color: '#80888e' }} />{' '}
          </div>
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to={path.HistoryPurchase}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center capitalize  transition-colors', {
              'text-orange': isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <FontAwesomeIcon icon={faFileInvoiceDollar} size='sm' style={{ color: '#80888e' }} />{' '}
          </div>
          Đơn mua
        </NavLink>
      </div>
    </div>
  )
}
