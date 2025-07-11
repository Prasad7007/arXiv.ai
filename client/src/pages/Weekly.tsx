
function Weekly() {
  return (
    <div>
      <div className="flex justify-center">
        <div className='max-w-3xl'>
          <div className='grid grid-cols-4'>
            <div className='bg-blue-200 text-center m-5 mt-10 p-10 border-4 border-blue-700 rounded-lg font-medium'>Total Papers</div>
            <div className='bg-blue-200 text-center m-5 mt-10 p-10 border-4 border-blue-700 rounded-lg font-medium'>Trending Papers</div>
            <div className='bg-blue-200 text-center m-5 mt-10 p-10 border-4 border-blue-700 rounded-lg font-medium'>Downloads</div>
            <div className='bg-blue-200 text-center m-5 mt-10 p-10 border-4 border-blue-700 rounded-lg font-medium'>Discussion</div>
          </div>
          <div className='m-5 border-4 border-blue-700 rounded-lg'>
            <div className=' p-5 bg-blue-200 border-b-4 border-blue-700 rounded-lg font-medium'>
              Weekly Highlights
            </div>
            <div className='grid grid-cols-3'>
              <div className='text-center bg-blue-200 m-5 p-5 rounded-lg border-4 border-gray-200 font-medium'>Most cited</div>
              <div className='text-center bg-blue-200 m-5 p-5 rounded-lg border-4 border-gray-200 font-medium'>Most downloaded</div>
              <div className='text-center bg-blue-200 m-5 p-5 rounded-lg border-4 border-gray-200 font-medium'>Most Discussed</div>
            </div>
          </div>
          <div>
            <div className='max-w-3xl border-b-4 border-slate-200'></div>
          </div>
          <div>
            <PaperCard title="Machine Learning" published_date="2024/08/18" abstract="Machine learning is subfield of ai!" />
          </div>
        </div>
      </div>
    </div>
  )
}
interface PaperCardProps {
  title: string;
  published_date: string;
  abstract: string;
}

const PaperCard = (props: PaperCardProps) => {
  return (
    <div className='flex justify-center'>
      <div className='bg-blue-200 m-5 min-w-[45.55rem] border-4 rounded-md border-blue-700'>
        <div>
          <div className="flex justify-between">
            <div className='font-sans font-semibold text-lg m-5'>
              Title:  {props.title}
            </div>
            <div className="m-5">
              {props.published_date}
            </div>
          </div>
        </div>

        <div className='p-5'>
          {props.abstract}
        </div>
      </div>
    </div>
  )
}


export default Weekly