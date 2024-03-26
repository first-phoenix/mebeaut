export default function Tooltip({ style, shade, setParameter }) {
    return (
        <div className = "group relative">
            <div className = "w-12 h-12" onClick = { () => setParameter(style) } style = {{ backgroundColor: shade }}></div>
            <div className = " absolute top-3 left-[58%]  hidden group-hover:block">
                <div className = "bottom-full rounded bg-black text-xs text-white px-2 py-1">{ style.charAt(0).toUpperCase() + style.slice(1) }</div>
            </div>
        </div>
    )
}