import React, { useRef, useEffect, useState } from "react";

export default function AudioWave({ pos, outerContext, drawOuterLayer, color = "white", scale = 1 }) {

	const canvasRef = useRef();

	const [context, setContext] = useState(null);
	const [linesArray, setLinesArray] = useState([]);

	useEffect(() => {

		const origin = {x: 8 * scale, y: 30 * scale};

		const part_1 = 5 * scale;
		const part_2 = 25 * scale;
		const part_3 = 50 * scale;

		// creating line objects

		const line_1 = new Line(
				{
				x: origin.x, 
				y: origin.y
			}, 
			part_1,
			scale
		);

		const line_2 = new Line(
			{
				x: origin.x * 2, 
				y: origin.y - (part_2 / 2)
			}, 
			part_2,
			scale
		);

		const line_3 = new Line(
			{
				x: origin.x * 3, 
				y: origin.y - (part_3 / 2)
			}, 
			part_3,
			scale
		);

		const line_4 = new Line(
			{
				x: origin.x * 4, 
				y: origin.y - (part_2 / 2)
			}, 
			part_2,
			scale,
			false
		);

		const line_5 = new Line(
			{
				x: origin.x * 5, 
				y: origin.y
			}, 
			part_1,
			scale
		);

		const line_6 = new Line(
			{
				x: origin.x * 6, 
				y: origin.y - (part_2 / 2)
			}, 
			part_2,
			scale
		);

		const line_7 = new Line(
			{
				x: origin.x * 7, 
				y: origin.y - (part_3 / 2)
			}, 
			part_3,
			scale
		);

		const line_8 = new Line(
			{
				x: origin.x * 8,
				y: origin.y - (part_2 / 2)
			}, 
			part_2,
			scale,
			false
		);

		const line_9 = new Line(
			{
				x: origin.x * 9, 
				y: origin.y
			}, 
			part_1,
			scale
		);

		setLinesArray([line_1, line_2, line_3, line_4, line_5, line_6, line_7, line_8, line_9]);

	}, [])


	useEffect(() => {

		const origin = {x: 8 * scale, y: 30 * scale};

	    if (canvasRef.current) {
	        canvasRef.current.width = (origin.x * 10) + 2;
	        canvasRef.current.height = origin.y * 2;
	        const ctx = canvasRef.current.getContext("2d");
	        setContext(ctx);
	    }    

	}, [scale]);

	

	useEffect(() => {

		const x = pos.x;
		const y = pos.y;

		function draw(canvas) {
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			linesArray.forEach(line => {
				line.update(context, color);
			});

		    outerContext.drawImage(canvas, x, y);

		}

		const update = () => {
			if (context) {
		        const canvas = canvasRef.current;

		        // must pass this prop in on first instance of this component

		        if (drawOuterLayer) {
		        	drawOuterLayer();
		        } 

		        draw(canvas);
		    }
		}

        let animationFrameId;

        // Check if null context has been replaced on component mount
        if (context) {
            //Our draw came here
            const render = () => {
               	update();
                animationFrameId = window.requestAnimationFrame(render);
            };
            render();
        }
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };

        // update();

    }, [context, outerContext, color, linesArray, pos, drawOuterLayer]);

	return (
		<div>
			<canvas ref={canvasRef} style={{display: "none"}}/>
		</div>
	);
}


class Line {
	constructor(pos, length, scale, shrink = true) {
		this.x = pos.x;
		this.y = pos.y;

		this.width = 2 * scale;
		this.height = length;

		this.shrink = shrink;

		if (scale >= 2) {
			this.animSpeed = 4;
		} else {
			this.animSpeed = 2;
		}

		this.minHeight = 5 * scale;
		this.maxHeight = 50 * scale;
	}

	draw(ctx, color) {
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	update(ctx, color) {
		this.draw(ctx, color);

		if (this.shrink) {
			if (this.height > this.minHeight) {
				this.height -= this.animSpeed;
				this.y += (this.animSpeed / 2);
			}

			if (this.height <= this.minHeight) {
				this.shrink = false;
			}
		}

		
		if (!this.shrink) {
			if (this.height < this.maxHeight) {
				this.height += this.animSpeed;
				this.y -= (this.animSpeed / 2);
			}

			if (this.height >= this.maxHeight) {
				this.shrink = true;
			}
		}
	}
}
