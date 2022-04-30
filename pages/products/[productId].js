import ProductCard from '@/components/Product/ProductCard'
import ProductPageContent from '@/components/Product/ProductPageContent'

const recursiveCatalog = async () => {
    return await fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((json) => {
            return json
        })
}
const getProduct = async (id) => {
    return await fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((json) => {
            return json
        })
}

const getProductsRecommended = async (category, exclude) => {
    return await fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((json) => {
            return json.filter((product) => product.category === category && product.id !== exclude)
        })
}

export default function ProductPage({ item, recommendations }) {
    return (
        <div>
            <ProductPageContent key={item.id} product={item} />
            <div className="">
                <div className="my-10 rounded-lg bg-white px-4 py-2 shadow-md ">
                    <h2 className="text-xl ">Vorgeschlagene Produkte</h2>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                    {recommendations.map((recItem) => {
                        return <ProductCard key={recItem.id} product={recItem} />
                    })}
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const products = await recursiveCatalog()

    const paths = products.map((item) => {
        const productId = String(item.id)
        return {
            params: { productId },
        }
    })

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const item = await getProduct(params.productId)
    const recommendations = await getProductsRecommended(item.category, item.id)
    return {
        props: {
            item,
            recommendations,
        },
    }
}
