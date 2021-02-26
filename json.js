var KPstate = {
    RWALK:  [{x: 0,    y: 7,  w: 17 ,  h: 24}, {x: 20,   y: 7,  w: 17,   h: 24}, {x: 40,   y: 7,  w: 16, h: 24}, {x: 60,   y: 7,  w: 16, h: 24}],
    LWALK:  [{x: 80,   y: 7,  w: 17,   h: 24}, {x: 100,  y: 7,  w: 17,   h: 24}, {x: 120,  y: 7,  w: 16, h: 24}, {x: 140,  y: 7,  w: 16, h: 24}],
    RPUNCH: [{x: 160,  y: 9,  w: 17,   h: 22}, {x: 180,  y: 9,  w: 17,   h: 22}],
    LPUNCH: [{x: 201,  y: 9,  w: 17,   h: 22}, {x: 221,  y: 9,  w: 17,   h: 22}],
    RKICK:  [{x: 241,  y: 9,  w: 19,   h: 22}, {x: 261,  y: 9,  w: 20,   h: 22}, {x: 280,  y: 9,  w: 20, h: 22}],
    LKICK:  [{x: 300,  y: 9,  w: 17,   h: 22}, {x: 320,  y: 9,  w: 19,   h: 22}, {x: 340,  y: 9,  w: 16, h: 22}],
    RDUCK:  [{x: 380,  y: 15, w: 17,   h: 16}],
    LDUCK:  [{x: 420,  y: 15, w: 17,   h: 16}],
    RJUMP:  [{x: 440,  y: 7,  w: 13,   h: 24}],
    LJUMP:  [{x: 460,  y: 7,  w: 13,   h: 24}],
    RIDLE:  [{x: 482,  y: 9,  w: 16,   h: 22}, {x: 501,  y: 9,  w: 17,   h: 22}],
    LIDLE:  [{x: 540,  y: 9,  w: 17.5, h: 22}, {x: 520,  y: 9,  w: 17.5, h: 22}],
    RROLL:  [{x: 560,  y: 12, w: 16,   h: 19}, {x: 580,  y: 15, w: 19,   h: 16}, {x: 600,  y: 12, w: 16, h: 19}, {x: 620,  y: 15, w: 19, h: 16}],
    LROLL:  [{x: 660,  y: 12, w: 16,   h: 19}, {x: 680,  y: 15, w: 19,   h: 16}, {x: 700,  y: 12, w: 16, h: 19}, {x: 720,  y: 15, w: 19, h: 16}],
    RDIE:   [{x: 780,  y: 9,  w: 16,   h: 22}, {x: 800,  y: 9,  w: 17,   h: 22}, {x: 820,  y: 9,  w: 16, h: 22}, {x: 840,  y: 10, w: 12, h: 21}, 
             {x: 860,  y: 17, w: 8,    h: 14}, {x: 880,  y: 22, w: 4,    h: 9},  {x: 900,  y: 27, w: 3,  h: 4},  {x: 921,  y: 29, w: 2,  h: 2}],
    LDIE:   [{x: 940,  y: 9,  w: 16,   h: 22}, {x: 960,  y: 9,  w: 17,   h: 22}, {x: 980,  y: 9,  w: 16, h: 22}, {x: 1000, y: 10, w: 12, h: 21},
             {x: 1020, y: 17, w: 8,    h: 14}, {x: 1040, y: 22, w: 4,    h: 9},  {x: 1060, y: 27, w: 3,  h: 4},  {x: 1081, y: 29, w: 2,  h: 2}],
    RBLOCK: [{x: 1099, y: 7,  w: 25,   h: 24}],
    LBLOCK: [{x: 1139, y: 7,  w: 25,   h: 24}]
};

var ChunLiState = {
        IDLE: [{x: 0, y: 1, w: 42, h: 76}, {x: 50, y: 1, w: 42, h: 76}, {x: 100, y: 0, w: 42, h: 77}, {x: 100, y: 0, w: 42, h: 77}],
        WALK: [{x: 210, y: 4, w: 46, h: 74}, {x: 260, y: 1, w: 42, h: 77}, {x: 310, y: 0, w: 37, h: 78}, {x: 360, y: 1, w: 43, h: 77}, 
            {x: 410, y: 3, w: 48, h: 75}, {x: 460, y: 1, w: 42, h: 77}, {x: 510, y: 0, w: 37, h: 78}, {x: 560, y: 1, w: 42, h: 77}],
        JUMP: [{x: 620, y: 28, w: 43, h: 65}, {x: 670, y: 0, w: 29, h: 95}, {x: 720, y: 0, w: 35, h: 60}, {x: 770, y: 0, w: 29, h: 95}],
        PUNCH: [{x: 830, y: 0, w: 60, h: 74}, {x: 910, y: 9, w: 76, h: 67}, {x: 990, y: 0, w: 60, h: 74}],
        KICK: [{x: 1100, y: 5, w: 42, h: 80}, {x: 1200, y: 0, w: 73, h: 86}, {x: 1300, y: 11, w: 60, h: 75}, {x: 1400, y: 13, w: 41, h: 73}],
        JKICK: [{x: 0, y: 142, w: 43, h: 83}, {x: 80, y: 144, w: 51, h: 81}, {x: 160, y: 134, w: 65, h: 64}, {x: 240, y: 130, w: 31, h: 93}, 
            {x: 320, y: 140, w: 64, h: 80}, {x: 400, y: 150, w: 52, h: 75}],
        SKICK: [{x: 500, y: 139, w: 63, h: 88}, {x: 590, y: 138, w: 71, h: 90}, {x: 680, y: 143, w: 69, h: 84}, {x: 770, y: 143, w: 78, h: 84}, 
            {x: 860, y: 145, w: 72, h: 83}, {x: 950, y: 143, w: 80, h: 83}, {x: 1040, y: 145, w: 61, h: 83}],
        BKICK: [{x: 0, y: 317, w: 39, h: 52}, {x: 90, y: 274, w: 30, h: 96}, {x: 180, y: 284, w: 52, h: 75}, {x: 270, y: 259, w: 64, h: 78},
            {x: 360, y: 250, w: 31, h: 93}, {x: 450, y: 268, w: 32, h: 102}, {x: 540, y: 250, w: 32, h: 93}, {x: 630, y: 266, w: 32, h: 63}, {x: 720, y: 268, w: 85, h: 62},
            {x: 810, y: 268, w: 28, h: 62}, {x: 900, y: 268, w: 85, h: 63}, {x: 990, y: 269, w: 32, h: 102}, {x: 1080, y: 251, w: 31, h: 93}, {x: 1170, y: 260, w: 64, h: 78}, 
            {x: 1260, y: 285, w: 52, h: 75}, {x: 1350, y: 275, w: 29, h: 96}],
        DIE: [{x: 0, y: 400, w: 71, h: 64}, {x: 84, y: 400, w: 55, h: 61}, {x: 169, y: 436, w: 81, h: 33}],
        GHIT: [{x: 320, y: 399, w: 42, h: 76}, {x: 396, y: 393, w: 44, h: 82}, {x: 462, y: 400, w: 60, h: 75}],
        DUCK: [{x: 600, y: 398, w: 42, h: 76}, {x: 650, y: 422, w: 38, h: 52}],
        BLOCK: [{x: 0, y: 481, w: 49, h: 75}, {x: 57, y: 496, w: 45, h: 60}]

};

var BillyLeeState = {
        IDLE: [{x: 0, y: 0, w: 20, h: 63}],
        WALK: [{x: 49, y: 0, w: 21, h: 63}, {x: 80, y: 0, w: 24, h: 62}, {x: 111, y: 0, w: 24, h: 63}, {x: 142, y: 0, w: 18, h: 62}],
        RPUNCH: [{x: 330, y: 0, w: 26, h: 60}, {x: 379, y: 0, w: 47, h: 59}, {x: 429, y: 0, w: 28, h: 58}],
        LPUNCH: [{x: 179, y: 0, w: 30, h: 60}, {x: 229, y: 0, w: 47, h: 59}, {x: 279, y: 0, w: 28, h: 59}],
        SPUNCH: [{x: 0, y: 75, w: 27, h: 59}, {x: 50, y: 75, w: 25, h: 57}, {x: 100, y: 75, w: 35, h: 60}, {x: 150, y: 66, w: 30, h: 70}],
        KICK: [{x: 199, y: 76, w: 28, h: 60}, {x: 250, y: 75, w: 27, h: 61}, {x: 300, y: 79, w: 44, h: 57}],
        SKICK: [{x: 0, y: 146, w: 24, h: 61}, {x: 50, y: 143, w: 28, h: 64}, {x: 100, y: 150, w: 37, y: 39}, {x: 150, y: 147, w: 44, h: 43}, {x: 200, y: 156, w: 37, h: 39}],
        GHIT: [{x: 0, y: 218, w: 22, h: 63}, {x: 30, y: 217, w: 27, h: 62}],
        JUMP: [{x: 16, y: 435, w: 28, h: 64}, {x: 52, y: 460, w: 37, h: 39}],
        DUCK: [{x: 120, y: 216, w: 20, h: 63}, {x: 160, y: 236, w: 30, h: 42}],
        DIE: [{x: 250, y: 153, w: 30, h: 42}, {x: 300, y: 161, w: 36, y: 34}, {x: 361, y: 166, w: 47, h: 30}, {x: 400, y: 167, w: 48, y: 30}]

};
var GokuState = {
    RIDLE:   [{x: 371, y: 121, w: 21, h: 25}],
    LIDLE:   [{x: 337, y: 121, w: 21, h: 25}],
    RWALK:   [{x: 416, y: 122, w: 24, h: 27}, {x: 468, y: 125, w: 24, h: 21}],
    LWALK:   [{x: 289, y: 122, w: 24, h: 27}, {x: 237, y: 125, w: 24, h: 21}],
    RPUNCH:  [{x: 420, y: 154, w: 30, h: 27}, {x: 450, y: 154, w: 30, h: 27}],
    LPUNCH:  [{x: 279, y: 154, w: 30, h: 27}, {x: 249, y: 154, w: 30, h: 27}],
    RKICK:   [{x: 530, y: 159, w: 25, h: 26}, {x: 560, y: 157, w: 23, h: 26}, {x: 589, y: 157, w: 25, h: 26}],
    LKICK:   [{x: 174, y: 159, w: 25, h: 26}, {x: 146, y: 157, w: 23, h: 26}, {x: 116, y: 157, w: 25, h: 26}],
    RDUCK:   [{x: 664, y: 163, w: 23, h: 20}],
    LDUCK:   [{x: 42, y: 163, w: 23, h: 20}],
    RJUMP:   [{x: 640, y: 155, w: 20, h: 28}],
    LJUMP:   [{x: 69, y: 155, w: 20, h: 28}],
    RPOWER:  [{x: 518, y: 114, w: 40, h: 35}, {x: 561, y: 114, w: 40, h: 35}, {x: 604, y: 114, w: 40, h: 35}],
    LPOWER:  [{x: 171, y: 114, w: 40, h: 35}, {x: 129, y: 114, w: 40, h: 35}, {x: 86, y: 114, w: 40, h: 35}],
    RBLAST:  [{x: 443, y: 302, w: 20, h: 25}, {x: 467, y: 292, w: 84, h: 42}],
    LBLAST:  [{x: 266, y: 302, w: 20, h: 25}, {x: 178, y: 292, w: 84, h: 42}],
    RGETHIT: [{x: 483, y: 193, w: 27, h: 23}, {x: 462, y: 189, w: 20, h: 27}],
    LGETHIT: [{x: 219, y: 193, w: 27, h: 23}, {x: 247, y: 189, w: 20, h: 27}],
    DEAD:    [{x: 510, y: 190, w: 23, h: 26}, {x: 533, y: 187, w: 23, h: 29}, {x: 557, y: 186, w: 23, h: 30}, {x: 584, y: 199, w: 30, h: 16}]

};
var opponentDeath;
var opponentDeathCount;
var opponentHitPoints;
var opponentBlock;
var opponentAtkRadius;
var opponentcX;
var opponentcY;


