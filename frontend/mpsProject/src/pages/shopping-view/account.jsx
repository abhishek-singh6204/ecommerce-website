import Orders from '@/component/shopping-view/orders';
import accImg from '../../assets/account.jpg'
import { TabsList,Tabs, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Address from '@/component/shopping-view/address';
import ShoppingOrders from '@/component/shopping-view/orders';
export default function ShoppingAccount(){
    return (
        <div className="flex flex-col ">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img src={accImg} alt="account image" className='h-full w-full object-cover'/>
            </div>
            <div className='container grid grid-cols-1 gap-8 max-w-7xl orderDetail' style={{margin:"auto"}}>
                <div className='flex flex-col rounded-lg border'>
                    <Tabs defaultValue="orders" style={{padding:"30px"}}>
                        <TabsList>
                            <TabsTrigger value="orders" style={{padding:"5px 10px" ,background:"none" }}>Orders</TabsTrigger>
                            <TabsTrigger value="address" style={{padding:"5px 10px" ,background:"none" }}>Address</TabsTrigger>
                        </TabsList>
                        <TabsContent value="orders"><ShoppingOrders/></TabsContent>
                        <TabsContent value="address"><Address/></TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}