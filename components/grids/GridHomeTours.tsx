import GridHomeToursItem, { IGridHomeToursItem } from "../panels/GridHomeToursItem"

export interface IGridHomeTours {
  items: IGridHomeToursItem[],

}

export default function GridHomeTours(data: IGridHomeTours) {
  return <section className="grid-home-tours grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {
      data.items.map((tourItem: IGridHomeToursItem, key: number) => {
        return <GridHomeToursItem
          key={`tour-${tourItem.tour.id}`}
          tour={tourItem.tour}
        />
      })
    }
  </section>
}