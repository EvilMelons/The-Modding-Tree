addLayer("Skills", {
    name: "Skills", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#71cbec",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Skill Points", // Name of prestige currency
    baseResource: "souls", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.65, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "S: Reset for Skill Points.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
        title: "Harvest",
        description: "Begin the hunt.",
        cost: new Decimal(0)
        },
        12: {
            title: "Speed",
            description: "Kill twice as fast.",
            cost: new Decimal(2)
        },
        13: {
            title: "Intelligence",
            description: "Learn a trick to triple the souls you get per kill.",
            cost: new Decimal(4)
        },
        14: {
            title: "Flight",
            description: "Learn to fly.  Unlocks the next major layer.",
            cost: new Decimal(5)
        }
    }
}),
addLayer("wings", {
    name: "wings",
    symbol: "W",
    position: 0,
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#A0d0e1",                       // The color for this layer, which affects many elements.
    resource: "wings",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "Skill points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.s.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.3,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() {
        let shown = hasUpgrade('Skills', 14)
     },          // Returns a bool for if this layer's node should be visible in the tree.

    milestones: {
        0: {
            requirementDescription: "1 wing",
            effectDescription: "Double skill point gain, and soul gain",
            done() { return player[this.layer].points.gte(1)}
        }
    },
})
