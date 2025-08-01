type HistoryProps = {
    query: string;
    date: string;
    filters?: string;
    results_count: number;
}

function HistoryCard({props}: {props: HistoryProps}) {
  return (
    <div className='m-10 border-4 rounded-lg border-blue-700 bg-blue-200'>
        <div className='flex justify-between items-center p-2'>
            <div className='font-medium'>
                Query: {props.query}
            </div>
            <div>
                {props.date}
            </div>
        </div>
        <div className='p-2 flex space-x-4'>
            <div>
                Filter: {props.filters ? props.filters : "None"} 
            </div>
            <div>
                Count: {props.results_count}
            </div>
        </div>
    </div>
  )
}

export default HistoryCard
