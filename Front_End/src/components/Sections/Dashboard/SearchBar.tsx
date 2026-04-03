import { Search } from 'lucide-react';


const SearchBar = () => {
    return (
        <main className="static absolute top-0 z-10 mb-6">
        <div className="flex justify-center">
          <div className="flex items-center gap-3 w-2/6 bg-white/30 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl px-4 py-2.5">
          <Search className='w-4 h-4 shrink-0'/>
            <input
              className="flex-1 bg-transparent outline-none text-[#1A0F0A] placeholder:text-[#8A7568] text-sm"
              placeholder="Search..."
            />
          </div>
        </div>
      </main>
    )
  }
  
  export default SearchBar