class FoodClass{
        constructor(){
            this.foodStock = 20;
            this.lastFed;
            this.image = loadImage("sprites/Milk.png");
        }

    updateFoodStock(foodStock)
    {
        this.foodStock = foodStock;
    }

    getFedTime(lastFed)
    {
        this.lastFed = lastFed;
    }

    deductFood()
    {
        if(this.foodStock > 0 )
        {
            this.foodStock = this.foodstock - 1
        }
        return this.foodStock;
    }

    getFoodStock()
    {
        return this.foodStock;
    }

    display()
    {
        var x = 80, y = 100;

        imageMode(CENTER);
        image(this.image, 275 , 320, 70, 70);

        if(this.foodStock != 0)
        {
            for(var i=0; i<this.foodStock; i++)
            {
                if(i%10 == 0)
                {
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }

}