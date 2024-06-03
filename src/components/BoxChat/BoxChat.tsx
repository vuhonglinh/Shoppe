import { faAngleRight, faHeadset, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { flip, offset, shift, useClick, useFloating, useInteractions } from '@floating-ui/react'

export default function BoxChat() {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    placement: 'top-start'
  })

  const click = useClick(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([click])

  return (
    <div>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className='h-[48px] w-[100px] bg-orange fixed z-50 right-[8px] bottom-0 rounded-lg flex items-center justify-center gap-2'
      >
        <FontAwesomeIcon icon={faHeadset} size='xl' style={{ color: '#ffffff' }} />
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='2 0 40 20' fill='white' className=' h-10 w-11'>
          <path d='M9.286 6.001c1.161 0 2.276.365 3.164 1.033.092.064.137.107.252.194.09.085.158.064.203 0 .046-.043.182-.194.251-.26.182-.17.433-.43.752-.752a.445.445 0 00.159-.323c0-.172-.092-.3-.227-.365A7.517 7.517 0 009.286 4C5.278 4 2 7.077 2 10.885s3.256 6.885 7.286 6.885a7.49 7.49 0 004.508-1.484l.022-.043a.411.411 0 00.046-.71v-.022a25.083 25.083 0 00-.957-.946.156.156 0 00-.227 0c-.933.796-2.117 1.205-3.392 1.205-2.846 0-5.169-2.196-5.169-4.885C4.117 8.195 6.417 6 9.286 6zm32.27 9.998h-.736c-.69 0-1.247-.54-1.247-1.209v-3.715h1.96a.44.44 0 00.445-.433V9.347h-2.45V7.035c-.021-.043-.066-.065-.111-.043l-1.603.583a.423.423 0 00-.29.41v1.362h-1.781v1.295c0 .238.2.433.445.433h1.337v4.19c0 1.382 1.158 2.505 2.583 2.505H42v-1.339a.44.44 0 00-.445-.432zm-21.901-6.62c-.739 0-1.41.172-2.013.496V4.43a.44.44 0 00-.446-.43h-1.788v13.77h2.234v-4.303c0-1.076.895-1.936 2.013-1.936 1.117 0 2.01.86 2.01 1.936v4.239h2.234v-4.561l-.021-.043c-.202-2.088-2.012-3.723-4.223-3.723zm10.054 6.785c-1.475 0-2.681-1.12-2.681-2.525 0-1.383 1.206-2.524 2.681-2.524 1.476 0 2.682 1.12 2.682 2.524 0 1.405-1.206 2.525-2.682 2.525zm2.884-6.224v.603a4.786 4.786 0 00-2.985-1.035c-2.533 0-4.591 1.897-4.591 4.246 0 2.35 2.058 4.246 4.59 4.246 1.131 0 2.194-.388 2.986-1.035v.604c0 .237.203.431.453.431h1.356V9.508h-1.356c-.25 0-.453.173-.453.432z'></path>
        </svg>
      </button>
      {isOpen && (
        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className='rounded-2xl'>
          <div className='w-[640px] h-[40px] bg-white flex justify-between rounded-sm'>
            <div className='flex text-center items-center justify-center gap-3 ml-2'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='2 0 40 20' fill='red' className='h-[50px] w-[50px]'>
                <path d='M9.286 6.001c1.161 0 2.276.365 3.164 1.033.092.064.137.107.252.194.09.085.158.064.203 0 .046-.043.182-.194.251-.26.182-.17.433-.43.752-.752a.445.445 0 00.159-.323c0-.172-.092-.3-.227-.365A7.517 7.517 0 009.286 4C5.278 4 2 7.077 2 10.885s3.256 6.885 7.286 6.885a7.49 7.49 0 004.508-1.484l.022-.043a.411.411 0 00.046-.71v-.022a25.083 25.083 0 00-.957-.946.156.156 0 00-.227 0c-.933.796-2.117 1.205-3.392 1.205-2.846 0-5.169-2.196-5.169-4.885C4.117 8.195 6.417 6 9.286 6zm32.27 9.998h-.736c-.69 0-1.247-.54-1.247-1.209v-3.715h1.96a.44.44 0 00.445-.433V9.347h-2.45V7.035c-.021-.043-.066-.065-.111-.043l-1.603.583a.423.423 0 00-.29.41v1.362h-1.781v1.295c0 .238.2.433.445.433h1.337v4.19c0 1.382 1.158 2.505 2.583 2.505H42v-1.339a.44.44 0 00-.445-.432zm-21.901-6.62c-.739 0-1.41.172-2.013.496V4.43a.44.44 0 00-.446-.43h-1.788v13.77h2.234v-4.303c0-1.076.895-1.936 2.013-1.936 1.117 0 2.01.86 2.01 1.936v4.239h2.234v-4.561l-.021-.043c-.202-2.088-2.012-3.723-4.223-3.723zm10.054 6.785c-1.475 0-2.681-1.12-2.681-2.525 0-1.383 1.206-2.524 2.681-2.524 1.476 0 2.682 1.12 2.682 2.524 0 1.405-1.206 2.525-2.682 2.525zm2.884-6.224v.603a4.786 4.786 0 00-2.985-1.035c-2.533 0-4.591 1.897-4.591 4.246 0 2.35 2.058 4.246 4.59 4.246 1.131 0 2.194-.388 2.986-1.035v.604c0 .237.203.431.453.431h1.356V9.508h-1.356c-.25 0-.453.173-.453.432z'></path>
              </svg>
              <span className='text-orange text-[10px]'>(14)</span>
            </div>
            <div className='flex text-center items-center justify-center gap-3 mr-2'>
              <button className='border border-10 border-slate-500 h-[20px] w-[20px]'>
                <FontAwesomeIcon icon={faAngleRight} size='lg' />
              </button>
              <button className='border border-10 border-slate-500 h-[20px] w-[20px]'>
                <FontAwesomeIcon icon={faAngleRight} size='lg' />
              </button>
            </div>
          </div>
          <div className='flex bg-white'>
            <div className='w-[30%]'>
              <div>
                <form>
                  <div className='p-1'>
                    <div className='relative mt-2 rounded-md shadow-sm'>
                      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                        <span className='text-gray-500 sm:text-sm'>
                          <FontAwesomeIcon icon={faMagnifyingGlass} size='sm' style={{ color: '#b3bccc' }} />
                        </span>
                      </div>
                      <input type='text' className='w-full rounded-md py-1 ' placeholder='Tìm kiếm...' />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className='w-[70%] bg-black'>02</div>
          </div>
        </div>
      )}
    </div>
  )
}
