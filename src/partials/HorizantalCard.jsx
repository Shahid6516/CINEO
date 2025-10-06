import React from 'react'
import { Link } from 'react-router-dom'

const HorizantalCard = ({ data }) => {
    return (
        <div className='w-full h-[40vh] p-5'>
            <div className='mb-5'>
                <h1 className=' text-2xl text-zinc-400 font-semibold '>Trending</h1>

            </div>

            <div className='w-[100%] h-[40vh] flex overflow-x-auto overflow '>
                {data.map((d, i) => (

                    <div key={i} className='min-w-[15%] h-full mr-5 bg-zinc-900 overflow-y-hidden'>
                        
                        <img className='w-full h-[60%]  object-cover bg-center ' src={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}`} alt="" />


                        <h1 className="p-1 text-sm w-[70%] font-black text-white">{d.name || d.title || d.original_name || d.original_title}</h1>

                        <p className="p-1 w-[100%] mt-3 mb-3 text-white text-xs ">{d.overview.slice(0, 70)} ...<Link className="text-blue-700">more</Link> </p>
                    </div>
                ))}
            </div>


            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem aperiam quibusdam assumenda laudantium non ab, saepe perferendis neque incidunt natus, sed distinctio blanditiis! Tempore alias non vero rem aspernatur delectus iure, laudantium sed minus nisi! Modi ut ducimus et non ipsum ratione quasi, cumque facilis illo numquam maiores voluptatibus eius aliquam nihil. Nisi, nulla quasi amet sint tenetur praesentium quisquam eligendi natus officiis, eveniet dolore. Consequuntur culpa consequatur excepturi commodi sit rem officiis ab temporibus quos! A sunt voluptatibus incidunt, quae quasi sint odit repellendus error consequuntur inventore maxime aperiam animi in, provident debitis ipsum consequatur, quibusdam ea cumque quo eligendi beatae nostrum laborum. Mollitia voluptas vero harum tenetur quisquam dolorem nulla rem, voluptates voluptate hic aut alias a quam officia blanditiis consectetur ducimus minima perferendis ab animi sequi labore itaque debitis quasi? Quibusdam esse repellendus atque consectetur, doloremque fugiat aperiam beatae soluta est voluptas corporis ad maiores asperiores similique dolore itaque deserunt quo magni tempora. Corporis veritatis quasi rem provident, officiis repellendus assumenda dolor temporibus perferendis nesciunt, tempora incidunt illo. Labore deleniti nesciunt velit. Inventore cum, veniam quis provident ex ducimus quibusdam quae impedit accusantium fugit cupiditate earum totam unde tenetur molestias obcaecati distinctio explicabo quasi quas ab quo eos tempora minima. Deserunt quia sunt a est, voluptatibus laborum voluptatem nulla voluptate dignissimos voluptas molestias totam perspiciatis reprehenderit ducimus quas tempora amet consectetur quo tenetur repellendus dolorum sapiente hic, obcaecati facilis. Voluptates est temporibus reprehenderit veritatis architecto optio eos hic omnis assumenda voluptatibus exercitationem consectetur inventore expedita, sed deserunt dicta! Fuga, aliquid! Perspiciatis, facere! Inventore rem aliquam qui expedita, nostrum, culpa consequuntur labore in quisquam ipsa exercitationem voluptatem iure minima. Aut quae praesentium saepe repudiandae quo alias voluptatem ut, iste natus, sit totam placeat eaque non doloribus magnam nulla nisi quaerat nam. At debitis aliquid aliquam ipsam minus, fugiat ullam eligendi sapiente quibusdam, iusto fugit ducimus quod laboriosam suscipit sit nobis voluptatem. Pariatur eligendi nam voluptas unde eaque repudiandae cumque sunt quae. Totam ex quae repellat necessitatibus, consectetur culpa. Non eos esse odio assumenda architecto, incidunt cum. Enim dolorum illum, ducimus placeat, nulla repellat quia itaque officiis reprehenderit tempore hic mollitia libero consectetur quos est? Libero placeat, sunt reiciendis ipsam voluptas optio, ea explicabo corporis et illum, mollitia provident sit necessitatibus. Quo optio ut molestias quas dolor quisquam laudantium eveniet possimus assumenda, quis quae dolorem, tenetur inventore accusamus quidem vel. Nisi commodi inventore exercitationem reprehenderit nostrum sequi amet suscipit.</h1>
        </div>
    )
}

export default HorizantalCard