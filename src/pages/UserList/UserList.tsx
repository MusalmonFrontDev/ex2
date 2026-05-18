import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../../components/ui/button'
import type { RootState } from '../../store/store'
import { Card, CardContent } from '../../components/ui/card'

const UserList = memo(() => {
  const userList = useSelector((state: RootState) => state.users.user)
  return (
      <div className='w-[1100px] mt-[50px] flex flex-col items-start justify-start '>
        <div className='pb-[30px] '>
          <h1 className='font-bold text-[40px]'>Latest jobs</h1>
        </div>
        <div className=' h-[530px] p-[30px] overflow-y-scroll flex flex-wrap gap-[50px] items-center justify-center'>
          {userList.map((user) => (
            <Card key={user.id} className="w-full max-w-[450px] border-none shadow-md rounded-lg overflow-hidden bg-white p-[25px]">
              <CardContent className="p-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-[32px] font-semibold text-[#1a1a1a] leading-tight">
                      {user.job}
                    </h2>
                    <p className="text-[#757575] text-xl mt-1">
                      {user.tip}
                    </p>
                  </div>

                  <div className="bg-[#cce3fd] text-[#1a1a1a] px-6 py-2 rounded-full text-[15px] font-medium">
                    {user.uroven}
                  </div>
                </div>

                <div className="flex justify-between items-end mt-10">
                  <Button
                    className="bg-[#2ba1fa] hover:bg-[#1a8ce5] text-white font-bold px-8 py-6 text-base uppercase rounded-md shadow-sm"
                  >
                    See More
                  </Button>

                  <span className="text-[#1a1a1a] text-[22px] font-normal">
                    {user.city}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>



  )
})

export default UserList