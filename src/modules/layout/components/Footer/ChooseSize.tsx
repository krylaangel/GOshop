import {MeasureSize} from "@product/components/modalWindows/MeasureSize";
import SizeGuide from "@product/components/modalWindows/SizeGuide";
import {SizeTable} from "@product/components/modalWindows/SizeTableLink";

export function ChooseSize(){
    return (
        <div className="clamp flex gap-y-8 flex-col mb-10">
            <div><h3 className="font-bold text-4xl w-full flex-center h-[50px] mb-1">Розмірна сітка</h3>
                <SizeTable/></div>
            <div className=""><h3 className="font-bold text-4xl w-full flex-center h-[50px] mb-1">Як знімати мірки</h3>
                <MeasureSize/></div>
        </div>
    )
}