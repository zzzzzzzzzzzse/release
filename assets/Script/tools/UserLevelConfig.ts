/**
 * 用户等级的相关配置
 */
 export default class UserLevelConfig  {
    private static readonly thisMaxLevel: number = 1000;//当前最大等级
    public static readonly expMultiple: bigint = BigInt(10000);//经验倍数;
    /**
     * 金币与金币的比例：1:1
     */
     private static readonly coin2exp: number = 1;//金币转经验为：1:1

    /**
     * 按等级返回区间值
     *
     * @param level
     * @return bigint
     */
    public static getUserLevelRectExp(level: number): bigint
    {
        switch (level)
        {
            case 1:return BigInt(0);
            case 2:return BigInt(50);
            case 3:return BigInt(50);
            case 4:return BigInt(50);
            case 5:return BigInt(200);
            case 6:return BigInt(300);
            case 7:return BigInt(400);
            case 8:return BigInt(500);
            case 9:return BigInt(600);
            case 10:return BigInt(1000);
            case 11:return BigInt(1200);
            case 12:return BigInt(1200);
            case 13:return BigInt(1400);
            case 14:return BigInt(1400);
            case 15:return BigInt(1500);
            case 16:return BigInt(1800);
            case 17:return BigInt(2100);
            case 18:return BigInt(2400);
            case 19:return BigInt(2700);
            case 20:return BigInt(2800);
            case 21:return BigInt(3200);
            case 22:return BigInt(3200);
            case 23:return BigInt(3200);
            case 24:return BigInt(3200);
            case 25:return BigInt(3500);
            case 26:return BigInt(3500);
            case 27:return BigInt(3500);
            case 28:return BigInt(4000);
            case 29:return BigInt(4000);
            case 30:return BigInt(5000);
            case 31:return BigInt(5000);
            case 32:return BigInt(10000);
            case 33:return BigInt(11000);
            case 34:return BigInt(12000);
            case 35:return BigInt(16000);
            case 36:return BigInt(18000);
            case 37:return BigInt(20000);
            case 38:return BigInt(22000);
            case 39:return BigInt(24000);
            case 40:return BigInt(27000);
            case 41:return BigInt(30000);
            case 42:return BigInt(33000);
            case 43:return BigInt(36000);
            case 44:return BigInt(39000);
            case 45:return BigInt(45000);
            case 46:return BigInt(50000);
            case 47:return BigInt(55000);
            case 48:return BigInt(60000);
            case 49:return BigInt(65000);
            case 50:return BigInt(75000);
            case 51:return BigInt(75000);
            case 52:return BigInt(75000);
            case 53:return BigInt(75000);
            case 54:return BigInt(82500);
            case 55:return BigInt(82500);
            case 56:return BigInt(90000);
            case 57:return BigInt(90000);
            case 58:return BigInt(97500);
            case 59:return BigInt(97500);
            case 60:return BigInt(100000);
            case 61:return BigInt(100000);
            case 62:return BigInt(100000);
            case 63:return BigInt(100000);
            case 64:return BigInt(100000);
            case 65:return BigInt(100000);
            case 66:return BigInt(100000);
            case 67:return BigInt(100000);
            case 68:return BigInt(100000);
            case 69:return BigInt(100000);
            case 70:return BigInt(125000);
            case 71:return BigInt(125000);
            case 72:return BigInt(125000);
            case 73:return BigInt(125000);
            case 74:return BigInt(125000);
            case 75:return BigInt(125000);
            case 76:return BigInt(125000);
            case 77:return BigInt(125000);
            case 78:return BigInt(125000);
            case 79:return BigInt(125000);
            case 80:return BigInt(150000);
            case 81:return BigInt(150000);
            case 82:return BigInt(150000);
            case 83:return BigInt(150000);
            case 84:return BigInt(150000);
            case 85:return BigInt(150000);
            case 86:return BigInt(150000);
            case 87:return BigInt(150000);
            case 88:return BigInt(150000);
            case 89:return BigInt(150000);
            case 90:return BigInt(175000);
            case 91:return BigInt(175000);
            case 92:return BigInt(175000);
            case 93:return BigInt(175000);
            case 94:return BigInt(175000);
            case 95:return BigInt(175000);
            case 96:return BigInt(175000);
            case 97:return BigInt(175000);
            case 98:return BigInt(175000);
            case 99:return BigInt(175000);
            case 100:return BigInt(200000);
            case 101:return BigInt(200000);
            case 102:return BigInt(200000);
            case 103:return BigInt(200000);
            case 104:return BigInt(200000);
            case 105:return BigInt(200000);
            case 106:return BigInt(200000);
            case 107:return BigInt(200000);
            case 108:return BigInt(200000);
            case 109:return BigInt(200000);
            case 110:return BigInt(250000);
            case 111:return BigInt(250000);
            case 112:return BigInt(250000);
            case 113:return BigInt(250000);
            case 114:return BigInt(250000);
            case 115:return BigInt(250000);
            case 116:return BigInt(250000);
            case 117:return BigInt(250000);
            case 118:return BigInt(250000);
            case 119:return BigInt(250000);
            case 120:return BigInt(300000);
            case 121:return BigInt(300000);
            case 122:return BigInt(300000);
            case 123:return BigInt(300000);
            case 124:return BigInt(300000);
            case 125:return BigInt(300000);
            case 126:return BigInt(300000);
            case 127:return BigInt(300000);
            case 128:return BigInt(300000);
            case 129:return BigInt(300000);
            case 130:return BigInt(350000);
            case 131:return BigInt(350000);
            case 132:return BigInt(350000);
            case 133:return BigInt(350000);
            case 134:return BigInt(350000);
            case 135:return BigInt(350000);
            case 136:return BigInt(350000);
            case 137:return BigInt(350000);
            case 138:return BigInt(350000);
            case 139:return BigInt(350000);
            case 140:return BigInt(400000);
            case 141:return BigInt(400000);
            case 142:return BigInt(400000);
            case 143:return BigInt(400000);
            case 144:return BigInt(400000);
            case 145:return BigInt(400000);
            case 146:return BigInt(400000);
            case 147:return BigInt(400000);
            case 148:return BigInt(400000);
            case 149:return BigInt(400000);
            case 150:return BigInt(450000);
            case 151:return BigInt(450000);
            case 152:return BigInt(450000);
            case 153:return BigInt(450000);
            case 154:return BigInt(450000);
            case 155:return BigInt(450000);
            case 156:return BigInt(450000);
            case 157:return BigInt(450000);
            case 158:return BigInt(450000);
            case 159:return BigInt(450000);
            case 160:return BigInt(500000);
            case 161:return BigInt(500000);
            case 162:return BigInt(500000);
            case 163:return BigInt(500000);
            case 164:return BigInt(500000);
            case 165:return BigInt(500000);
            case 166:return BigInt(500000);
            case 167:return BigInt(500000);
            case 168:return BigInt(500000);
            case 169:return BigInt(500000);
            case 170:return BigInt(500000);
            case 171:return BigInt(500000);
            case 172:return BigInt(500000);
            case 173:return BigInt(500000);
            case 174:return BigInt(500000);
            case 175:return BigInt(500000);
            case 176:return BigInt(500000);
            case 177:return BigInt(500000);
            case 178:return BigInt(500000);
            case 179:return BigInt(500000);
            case 180:return BigInt(700000);
            case 181:return BigInt(700000);
            case 182:return BigInt(700000);
            case 183:return BigInt(700000);
            case 184:return BigInt(700000);
            case 185:return BigInt(700000);
            case 186:return BigInt(700000);
            case 187:return BigInt(700000);
            case 188:return BigInt(700000);
            case 189:return BigInt(700000);
            case 190:return BigInt(800000);
            case 191:return BigInt(800000);
            case 192:return BigInt(800000);
            case 193:return BigInt(800000);
            case 194:return BigInt(800000);
            case 195:return BigInt(800000);
            case 196:return BigInt(800000);
            case 197:return BigInt(800000);
            case 198:return BigInt(800000);
            case 199:return BigInt(800000);
            case 200:return BigInt(1000000);
            case 201:return BigInt(1000000);
            case 202:return BigInt(1000000);
            case 203:return BigInt(1000000);
            case 204:return BigInt(1000000);
            case 205:return BigInt(1000000);
            case 206:return BigInt(1000000);
            case 207:return BigInt(1000000);
            case 208:return BigInt(1000000);
            case 209:return BigInt(1000000);
            case 210:return BigInt(1200000);
            case 211:return BigInt(1200000);
            case 212:return BigInt(1200000);
            case 213:return BigInt(1200000);
            case 214:return BigInt(1200000);
            case 215:return BigInt(1200000);
            case 216:return BigInt(1200000);
            case 217:return BigInt(1200000);
            case 218:return BigInt(1200000);
            case 219:return BigInt(1200000);
            case 220:return BigInt(1500000);
            case 221:return BigInt(1500000);
            case 222:return BigInt(1500000);
            case 223:return BigInt(1500000);
            case 224:return BigInt(1500000);
            case 225:return BigInt(1500000);
            case 226:return BigInt(1500000);
            case 227:return BigInt(1500000);
            case 228:return BigInt(1500000);
            case 229:return BigInt(1500000);
            case 230:return BigInt(1500000);
            case 231:return BigInt(1500000);
            case 232:return BigInt(1500000);
            case 233:return BigInt(1500000);
            case 234:return BigInt(1500000);
            case 235:return BigInt(1500000);
            case 236:return BigInt(1500000);
            case 237:return BigInt(1500000);
            case 238:return BigInt(1500000);
            case 239:return BigInt(1500000);
            case 240:return BigInt(2000000);
            case 241:return BigInt(2000000);
            case 242:return BigInt(2000000);
            case 243:return BigInt(2000000);
            case 244:return BigInt(2000000);
            case 245:return BigInt(2000000);
            case 246:return BigInt(2000000);
            case 247:return BigInt(2000000);
            case 248:return BigInt(2000000);
            case 249:return BigInt(2000000);
            case 250:return BigInt(2000000);
            case 251:return BigInt(2000000);
            case 252:return BigInt(2000000);
            case 253:return BigInt(2000000);
            case 254:return BigInt(2000000);
            case 255:return BigInt(2000000);
            case 256:return BigInt(2000000);
            case 257:return BigInt(2000000);
            case 258:return BigInt(2000000);
            case 259:return BigInt(2000000);
            case 260:return BigInt(2500000);
            case 261:return BigInt(2500000);
            case 262:return BigInt(2500000);
            case 263:return BigInt(2500000);
            case 264:return BigInt(2500000);
            case 265:return BigInt(2500000);
            case 266:return BigInt(2500000);
            case 267:return BigInt(2500000);
            case 268:return BigInt(2500000);
            case 269:return BigInt(2500000);
            case 270:return BigInt(2500000);
            case 271:return BigInt(2500000);
            case 272:return BigInt(2500000);
            case 273:return BigInt(2500000);
            case 274:return BigInt(2500000);
            case 275:return BigInt(2500000);
            case 276:return BigInt(2500000);
            case 277:return BigInt(2500000);
            case 278:return BigInt(2500000);
            case 279:return BigInt(2500000);
            case 280:return BigInt(3000000);
            case 281:return BigInt(3000000);
            case 282:return BigInt(3000000);
            case 283:return BigInt(3000000);
            case 284:return BigInt(3000000);
            case 285:return BigInt(3000000);
            case 286:return BigInt(3000000);
            case 287:return BigInt(3000000);
            case 288:return BigInt(3000000);
            case 289:return BigInt(3000000);
            case 290:return BigInt(3000000);
            case 291:return BigInt(3000000);
            case 292:return BigInt(3000000);
            case 293:return BigInt(3000000);
            case 294:return BigInt(3000000);
            case 295:return BigInt(3000000);
            case 296:return BigInt(3000000);
            case 297:return BigInt(3000000);
            case 298:return BigInt(3000000);
            case 299:return BigInt(3000000);
            case 300:return BigInt(3500000);
            case 301:return BigInt(3500000);
            case 302:return BigInt(3500000);
            case 303:return BigInt(3500000);
            case 304:return BigInt(3500000);
            case 305:return BigInt(3500000);
            case 306:return BigInt(3500000);
            case 307:return BigInt(3500000);
            case 308:return BigInt(3500000);
            case 309:return BigInt(3500000);
            case 310:return BigInt(3500000);
            case 311:return BigInt(3500000);
            case 312:return BigInt(3500000);
            case 313:return BigInt(3500000);
            case 314:return BigInt(3500000);
            case 315:return BigInt(3500000);
            case 316:return BigInt(3500000);
            case 317:return BigInt(3500000);
            case 318:return BigInt(3500000);
            case 319:return BigInt(3500000);
            case 320:return BigInt(4000000);
            case 321:return BigInt(4000000);
            case 322:return BigInt(4000000);
            case 323:return BigInt(4000000);
            case 324:return BigInt(4000000);
            case 325:return BigInt(4000000);
            case 326:return BigInt(4000000);
            case 327:return BigInt(4000000);
            case 328:return BigInt(4000000);
            case 329:return BigInt(4000000);
            case 330:return BigInt(4000000);
            case 331:return BigInt(4000000);
            case 332:return BigInt(4000000);
            case 333:return BigInt(4000000);
            case 334:return BigInt(4000000);
            case 335:return BigInt(4000000);
            case 336:return BigInt(4000000);
            case 337:return BigInt(4000000);
            case 338:return BigInt(4000000);
            case 339:return BigInt(4000000);
            case 340:return BigInt(4000000);
            case 341:return BigInt(4000000);
            case 342:return BigInt(4000000);
            case 343:return BigInt(4000000);
            case 344:return BigInt(4000000);
            case 345:return BigInt(4000000);
            case 346:return BigInt(4000000);
            case 347:return BigInt(4000000);
            case 348:return BigInt(4000000);
            case 349:return BigInt(4000000);
            case 350:return BigInt(4500000);
            case 351:return BigInt(4500000);
            case 352:return BigInt(4500000);
            case 353:return BigInt(4500000);
            case 354:return BigInt(4500000);
            case 355:return BigInt(4500000);
            case 356:return BigInt(4500000);
            case 357:return BigInt(4500000);
            case 358:return BigInt(4500000);
            case 359:return BigInt(4500000);
            case 360:return BigInt(4500000);
            case 361:return BigInt(4500000);
            case 362:return BigInt(4500000);
            case 363:return BigInt(4500000);
            case 364:return BigInt(4500000);
            case 365:return BigInt(4500000);
            case 366:return BigInt(4500000);
            case 367:return BigInt(4500000);
            case 368:return BigInt(4500000);
            case 369:return BigInt(4500000);
            case 370:return BigInt(4500000);
            case 371:return BigInt(4500000);
            case 372:return BigInt(4500000);
            case 373:return BigInt(4500000);
            case 374:return BigInt(4500000);
            case 375:return BigInt(4500000);
            case 376:return BigInt(4500000);
            case 377:return BigInt(4500000);
            case 378:return BigInt(4500000);
            case 379:return BigInt(4500000);
            case 380:return BigInt(5000000);
            case 381:return BigInt(5000000);
            case 382:return BigInt(5000000);
            case 383:return BigInt(5000000);
            case 384:return BigInt(5000000);
            case 385:return BigInt(5000000);
            case 386:return BigInt(5000000);
            case 387:return BigInt(5000000);
            case 388:return BigInt(5000000);
            case 389:return BigInt(5000000);
            case 390:return BigInt(5000000);
            case 391:return BigInt(5000000);
            case 392:return BigInt(5000000);
            case 393:return BigInt(5000000);
            case 394:return BigInt(5000000);
            case 395:return BigInt(5000000);
            case 396:return BigInt(5000000);
            case 397:return BigInt(5000000);
            case 398:return BigInt(5000000);
            case 399:return BigInt(5000000);
            case 400:return BigInt(5000000);
            case 401:return BigInt(5000000);
            case 402:return BigInt(5000000);
            case 403:return BigInt(5000000);
            case 404:return BigInt(5000000);
            case 405:return BigInt(5000000);
            case 406:return BigInt(5000000);
            case 407:return BigInt(5000000);
            case 408:return BigInt(5000000);
            case 409:return BigInt(5000000);
            case 410:return BigInt(5500000);
            case 411:return BigInt(5500000);
            case 412:return BigInt(5500000);
            case 413:return BigInt(5500000);
            case 414:return BigInt(5500000);
            case 415:return BigInt(5500000);
            case 416:return BigInt(5500000);
            case 417:return BigInt(5500000);
            case 418:return BigInt(5500000);
            case 419:return BigInt(5500000);
            case 420:return BigInt(5500000);
            case 421:return BigInt(5500000);
            case 422:return BigInt(5500000);
            case 423:return BigInt(5500000);
            case 424:return BigInt(5500000);
            case 425:return BigInt(5500000);
            case 426:return BigInt(5500000);
            case 427:return BigInt(5500000);
            case 428:return BigInt(5500000);
            case 429:return BigInt(5500000);
            case 430:return BigInt(6000000);
            case 431:return BigInt(6000000);
            case 432:return BigInt(6000000);
            case 433:return BigInt(6000000);
            case 434:return BigInt(6000000);
            case 435:return BigInt(6000000);
            case 436:return BigInt(6000000);
            case 437:return BigInt(6000000);
            case 438:return BigInt(6000000);
            case 439:return BigInt(6000000);
            case 440:return BigInt(6000000);
            case 441:return BigInt(6000000);
            case 442:return BigInt(6000000);
            case 443:return BigInt(6000000);
            case 444:return BigInt(6000000);
            case 445:return BigInt(6000000);
            case 446:return BigInt(6000000);
            case 447:return BigInt(6000000);
            case 448:return BigInt(6000000);
            case 449:return BigInt(6000000);
            case 450:return BigInt(6500000);
            case 451:return BigInt(6500000);
            case 452:return BigInt(6500000);
            case 453:return BigInt(6500000);
            case 454:return BigInt(6500000);
            case 455:return BigInt(6500000);
            case 456:return BigInt(6500000);
            case 457:return BigInt(6500000);
            case 458:return BigInt(6500000);
            case 459:return BigInt(6500000);
            case 460:return BigInt(6500000);
            case 461:return BigInt(6500000);
            case 462:return BigInt(6500000);
            case 463:return BigInt(6500000);
            case 464:return BigInt(6500000);
            case 465:return BigInt(6500000);
            case 466:return BigInt(6500000);
            case 467:return BigInt(6500000);
            case 468:return BigInt(6500000);
            case 469:return BigInt(6500000);
            case 470:return BigInt(7000000);
            case 471:return BigInt(7000000);
            case 472:return BigInt(7000000);
            case 473:return BigInt(7000000);
            case 474:return BigInt(7000000);
            case 475:return BigInt(7000000);
            case 476:return BigInt(7000000);
            case 477:return BigInt(7000000);
            case 478:return BigInt(7000000);
            case 479:return BigInt(7000000);
            case 480:return BigInt(7000000);
            case 481:return BigInt(7000000);
            case 482:return BigInt(7000000);
            case 483:return BigInt(7000000);
            case 484:return BigInt(7000000);
            case 485:return BigInt(7000000);
            case 486:return BigInt(7000000);
            case 487:return BigInt(7000000);
            case 488:return BigInt(7000000);
            case 489:return BigInt(7000000);
            case 490:return BigInt(7000000);
            case 491:return BigInt(7000000);
            case 492:return BigInt(7000000);
            case 493:return BigInt(7000000);
            case 494:return BigInt(7000000);
            case 495:return BigInt(7000000);
            case 496:return BigInt(7000000);
            case 497:return BigInt(7000000);
            case 498:return BigInt(7000000);
            case 499:return BigInt(7000000);
            case 500:return BigInt(8000000);
            case 501:return BigInt(8000000);
            case 502:return BigInt(8000000);
            case 503:return BigInt(8000000);
            case 504:return BigInt(8000000);
            case 505:return BigInt(8000000);
            case 506:return BigInt(8000000);
            case 507:return BigInt(8000000);
            case 508:return BigInt(8000000);
            case 509:return BigInt(8000000);
            case 510:return BigInt(8000000);
            case 511:return BigInt(8000000);
            case 512:return BigInt(8000000);
            case 513:return BigInt(8000000);
            case 514:return BigInt(8000000);
            case 515:return BigInt(8000000);
            case 516:return BigInt(8000000);
            case 517:return BigInt(8000000);
            case 518:return BigInt(8000000);
            case 519:return BigInt(8000000);
            case 520:return BigInt(8000000);
            case 521:return BigInt(8000000);
            case 522:return BigInt(8000000);
            case 523:return BigInt(8000000);
            case 524:return BigInt(8000000);
            case 525:return BigInt(8000000);
            case 526:return BigInt(8000000);
            case 527:return BigInt(8000000);
            case 528:return BigInt(8000000);
            case 529:return BigInt(8000000);
            case 530:return BigInt(9000000);
            case 531:return BigInt(9000000);
            case 532:return BigInt(9000000);
            case 533:return BigInt(9000000);
            case 534:return BigInt(9000000);
            case 535:return BigInt(9000000);
            case 536:return BigInt(9000000);
            case 537:return BigInt(9000000);
            case 538:return BigInt(9000000);
            case 539:return BigInt(9000000);
            case 540:return BigInt(9000000);
            case 541:return BigInt(9000000);
            case 542:return BigInt(9000000);
            case 543:return BigInt(9000000);
            case 544:return BigInt(9000000);
            case 545:return BigInt(9000000);
            case 546:return BigInt(9000000);
            case 547:return BigInt(9000000);
            case 548:return BigInt(9000000);
            case 549:return BigInt(9000000);
            case 550:return BigInt(9000000);
            case 551:return BigInt(9000000);
            case 552:return BigInt(9000000);
            case 553:return BigInt(9000000);
            case 554:return BigInt(9000000);
            case 555:return BigInt(9000000);
            case 556:return BigInt(9000000);
            case 557:return BigInt(9000000);
            case 558:return BigInt(9000000);
            case 559:return BigInt(9000000);
            case 560:return BigInt(10000000);
            case 561:return BigInt(10000000);
            case 562:return BigInt(10000000);
            case 563:return BigInt(10000000);
            case 564:return BigInt(10000000);
            case 565:return BigInt(10000000);
            case 566:return BigInt(10000000);
            case 567:return BigInt(10000000);
            case 568:return BigInt(10000000);
            case 569:return BigInt(10000000);
            case 570:return BigInt(10000000);
            case 571:return BigInt(10000000);
            case 572:return BigInt(10000000);
            case 573:return BigInt(10000000);
            case 574:return BigInt(10000000);
            case 575:return BigInt(10000000);
            case 576:return BigInt(10000000);
            case 577:return BigInt(10000000);
            case 578:return BigInt(10000000);
            case 579:return BigInt(10000000);
            case 580:return BigInt(10000000);
            case 581:return BigInt(10000000);
            case 582:return BigInt(10000000);
            case 583:return BigInt(10000000);
            case 584:return BigInt(10000000);
            case 585:return BigInt(10000000);
            case 586:return BigInt(10000000);
            case 587:return BigInt(10000000);
            case 588:return BigInt(10000000);
            case 589:return BigInt(10000000);
            case 590:return BigInt(10000000);
            case 591:return BigInt(10000000);
            case 592:return BigInt(10000000);
            case 593:return BigInt(10000000);
            case 594:return BigInt(10000000);
            case 595:return BigInt(10000000);
            case 596:return BigInt(10000000);
            case 597:return BigInt(10000000);
            case 598:return BigInt(10000000);
            case 599:return BigInt(11000000);
            case 600:return BigInt(11000000);
            case 601:return BigInt(11000000);
            case 602:return BigInt(11000000);
            case 603:return BigInt(11000000);
            case 604:return BigInt(11000000);
            case 605:return BigInt(11000000);
            case 606:return BigInt(11000000);
            case 607:return BigInt(11000000);
            case 608:return BigInt(11000000);
            case 609:return BigInt(11000000);
            case 610:return BigInt(11000000);
            case 611:return BigInt(11000000);
            case 612:return BigInt(11000000);
            case 613:return BigInt(11000000);
            case 614:return BigInt(11000000);
            case 615:return BigInt(11000000);
            case 616:return BigInt(11000000);
            case 617:return BigInt(11000000);
            case 618:return BigInt(11000000);
            case 619:return BigInt(11000000);
            case 620:return BigInt(12000000);
            case 621:return BigInt(12000000);
            case 622:return BigInt(12000000);
            case 623:return BigInt(12000000);
            case 624:return BigInt(12000000);
            case 625:return BigInt(12000000);
            case 626:return BigInt(12000000);
            case 627:return BigInt(12000000);
            case 628:return BigInt(12000000);
            case 629:return BigInt(12000000);
            case 630:return BigInt(12000000);
            case 631:return BigInt(12000000);
            case 632:return BigInt(12000000);
            case 633:return BigInt(12000000);
            case 634:return BigInt(12000000);
            case 635:return BigInt(12000000);
            case 636:return BigInt(12000000);
            case 637:return BigInt(12000000);
            case 638:return BigInt(12000000);
            case 639:return BigInt(12000000);
            case 640:return BigInt(13000000);
            case 641:return BigInt(13000000);
            case 642:return BigInt(13000000);
            case 643:return BigInt(13000000);
            case 644:return BigInt(13000000);
            case 645:return BigInt(13000000);
            case 646:return BigInt(13000000);
            case 647:return BigInt(13000000);
            case 648:return BigInt(13000000);
            case 649:return BigInt(13000000);
            case 650:return BigInt(13000000);
            case 651:return BigInt(13000000);
            case 652:return BigInt(13000000);
            case 653:return BigInt(13000000);
            case 654:return BigInt(13000000);
            case 655:return BigInt(13000000);
            case 656:return BigInt(13000000);
            case 657:return BigInt(13000000);
            case 658:return BigInt(13000000);
            case 659:return BigInt(13000000);
            case 660:return BigInt(14000000);
            case 661:return BigInt(14000000);
            case 662:return BigInt(14000000);
            case 663:return BigInt(14000000);
            case 664:return BigInt(14000000);
            case 665:return BigInt(14000000);
            case 666:return BigInt(14000000);
            case 667:return BigInt(14000000);
            case 668:return BigInt(14000000);
            case 669:return BigInt(14000000);
            case 670:return BigInt(14000000);
            case 671:return BigInt(14000000);
            case 672:return BigInt(14000000);
            case 673:return BigInt(14000000);
            case 674:return BigInt(14000000);
            case 675:return BigInt(14000000);
            case 676:return BigInt(14000000);
            case 677:return BigInt(14000000);
            case 678:return BigInt(14000000);
            case 679:return BigInt(14000000);
            case 680:return BigInt(15000000);
            case 681:return BigInt(15000000);
            case 682:return BigInt(15000000);
            case 683:return BigInt(15000000);
            case 684:return BigInt(15000000);
            case 685:return BigInt(15000000);
            case 686:return BigInt(15000000);
            case 687:return BigInt(15000000);
            case 688:return BigInt(15000000);
            case 689:return BigInt(15000000);
            case 690:return BigInt(15000000);
            case 691:return BigInt(15000000);
            case 692:return BigInt(15000000);
            case 693:return BigInt(15000000);
            case 694:return BigInt(15000000);
            case 695:return BigInt(15000000);
            case 696:return BigInt(15000000);
            case 697:return BigInt(15000000);
            case 698:return BigInt(15000000);
            case 699:return BigInt(15000000);
            case 700:return BigInt(20000000);
            case 701:return BigInt(20000000);
            case 702:return BigInt(20000000);
            case 703:return BigInt(20000000);
            case 704:return BigInt(20000000);
            case 705:return BigInt(20000000);
            case 706:return BigInt(20000000);
            case 707:return BigInt(20000000);
            case 708:return BigInt(20000000);
            case 709:return BigInt(20000000);
            case 710:return BigInt(20000000);
            case 711:return BigInt(20000000);
            case 712:return BigInt(20000000);
            case 713:return BigInt(20000000);
            case 714:return BigInt(20000000);
            case 715:return BigInt(20000000);
            case 716:return BigInt(20000000);
            case 717:return BigInt(20000000);
            case 718:return BigInt(20000000);
            case 719:return BigInt(20000000);
            case 720:return BigInt(22000000);
            case 721:return BigInt(22000000);
            case 722:return BigInt(22000000);
            case 723:return BigInt(22000000);
            case 724:return BigInt(22000000);
            case 725:return BigInt(22000000);
            case 726:return BigInt(22000000);
            case 727:return BigInt(22000000);
            case 728:return BigInt(22000000);
            case 729:return BigInt(22000000);
            case 730:return BigInt(22000000);
            case 731:return BigInt(22000000);
            case 732:return BigInt(22000000);
            case 733:return BigInt(22000000);
            case 734:return BigInt(22000000);
            case 735:return BigInt(22000000);
            case 736:return BigInt(22000000);
            case 737:return BigInt(22000000);
            case 738:return BigInt(22000000);
            case 739:return BigInt(22000000);
            case 740:return BigInt(25000000);
            case 741:return BigInt(25000000);
            case 742:return BigInt(25000000);
            case 743:return BigInt(25000000);
            case 744:return BigInt(25000000);
            case 745:return BigInt(25000000);
            case 746:return BigInt(25000000);
            case 747:return BigInt(25000000);
            case 748:return BigInt(25000000);
            case 749:return BigInt(25000000);
            case 750:return BigInt(25000000);
            case 751:return BigInt(25000000);
            case 752:return BigInt(25000000);
            case 753:return BigInt(25000000);
            case 754:return BigInt(25000000);
            case 755:return BigInt(25000000);
            case 756:return BigInt(25000000);
            case 757:return BigInt(25000000);
            case 758:return BigInt(25000000);
            case 759:return BigInt(25000000);
            case 760:return BigInt(30000000);
            case 761:return BigInt(30000000);
            case 762:return BigInt(30000000);
            case 763:return BigInt(30000000);
            case 764:return BigInt(30000000);
            case 765:return BigInt(30000000);
            case 766:return BigInt(30000000);
            case 767:return BigInt(30000000);
            case 768:return BigInt(30000000);
            case 769:return BigInt(30000000);
            case 770:return BigInt(30000000);
            case 771:return BigInt(30000000);
            case 772:return BigInt(30000000);
            case 773:return BigInt(30000000);
            case 774:return BigInt(30000000);
            case 775:return BigInt(30000000);
            case 776:return BigInt(30000000);
            case 777:return BigInt(30000000);
            case 778:return BigInt(30000000);
            case 779:return BigInt(30000000);
            case 780:return BigInt(35000000);
            case 781:return BigInt(35000000);
            case 782:return BigInt(35000000);
            case 783:return BigInt(35000000);
            case 784:return BigInt(35000000);
            case 785:return BigInt(35000000);
            case 786:return BigInt(35000000);
            case 787:return BigInt(35000000);
            case 788:return BigInt(35000000);
            case 789:return BigInt(35000000);
            case 790:return BigInt(35000000);
            case 791:return BigInt(35000000);
            case 792:return BigInt(35000000);
            case 793:return BigInt(35000000);
            case 794:return BigInt(35000000);
            case 795:return BigInt(35000000);
            case 796:return BigInt(35000000);
            case 797:return BigInt(35000000);
            case 798:return BigInt(35000000);
            case 799:return BigInt(35000000);
            case 800:return BigInt(40000000);
            case 801:return BigInt(40000000);
            case 802:return BigInt(40000000);
            case 803:return BigInt(40000000);
            case 804:return BigInt(40000000);
            case 805:return BigInt(40000000);
            case 806:return BigInt(40000000);
            case 807:return BigInt(40000000);
            case 808:return BigInt(40000000);
            case 809:return BigInt(40000000);
            case 810:return BigInt(40000000);
            case 811:return BigInt(40000000);
            case 812:return BigInt(40000000);
            case 813:return BigInt(40000000);
            case 814:return BigInt(40000000);
            case 815:return BigInt(40000000);
            case 816:return BigInt(40000000);
            case 817:return BigInt(40000000);
            case 818:return BigInt(40000000);
            case 819:return BigInt(40000000);
            case 820:return BigInt(40000000);
            case 821:return BigInt(40000000);
            case 822:return BigInt(40000000);
            case 823:return BigInt(40000000);
            case 824:return BigInt(40000000);
            case 825:return BigInt(40000000);
            case 826:return BigInt(40000000);
            case 827:return BigInt(40000000);
            case 828:return BigInt(40000000);
            case 829:return BigInt(40000000);
            case 830:return BigInt(40000000);
            case 831:return BigInt(40000000);
            case 832:return BigInt(40000000);
            case 833:return BigInt(40000000);
            case 834:return BigInt(40000000);
            case 835:return BigInt(40000000);
            case 836:return BigInt(40000000);
            case 837:return BigInt(40000000);
            case 838:return BigInt(40000000);
            case 839:return BigInt(40000000);
            case 840:return BigInt(40000000);
            case 841:return BigInt(40000000);
            case 842:return BigInt(40000000);
            case 843:return BigInt(40000000);
            case 844:return BigInt(40000000);
            case 845:return BigInt(40000000);
            case 846:return BigInt(40000000);
            case 847:return BigInt(40000000);
            case 848:return BigInt(40000000);
            case 849:return BigInt(40000000);
            case 850:return BigInt(45000000);
            case 851:return BigInt(45000000);
            case 852:return BigInt(45000000);
            case 853:return BigInt(45000000);
            case 854:return BigInt(45000000);
            case 855:return BigInt(45000000);
            case 856:return BigInt(45000000);
            case 857:return BigInt(45000000);
            case 858:return BigInt(45000000);
            case 859:return BigInt(45000000);
            case 860:return BigInt(45000000);
            case 861:return BigInt(45000000);
            case 862:return BigInt(45000000);
            case 863:return BigInt(45000000);
            case 864:return BigInt(45000000);
            case 865:return BigInt(45000000);
            case 866:return BigInt(45000000);
            case 867:return BigInt(45000000);
            case 868:return BigInt(45000000);
            case 869:return BigInt(45000000);
            case 870:return BigInt(45000000);
            case 871:return BigInt(45000000);
            case 872:return BigInt(45000000);
            case 873:return BigInt(45000000);
            case 874:return BigInt(45000000);
            case 875:return BigInt(45000000);
            case 876:return BigInt(45000000);
            case 877:return BigInt(45000000);
            case 878:return BigInt(45000000);
            case 879:return BigInt(45000000);
            case 880:return BigInt(45000000);
            case 881:return BigInt(45000000);
            case 882:return BigInt(45000000);
            case 883:return BigInt(45000000);
            case 884:return BigInt(45000000);
            case 885:return BigInt(45000000);
            case 886:return BigInt(45000000);
            case 887:return BigInt(45000000);
            case 888:return BigInt(45000000);
            case 889:return BigInt(45000000);
            case 890:return BigInt(45000000);
            case 891:return BigInt(45000000);
            case 892:return BigInt(45000000);
            case 893:return BigInt(45000000);
            case 894:return BigInt(45000000);
            case 895:return BigInt(45000000);
            case 896:return BigInt(45000000);
            case 897:return BigInt(45000000);
            case 898:return BigInt(45000000);
            case 899:return BigInt(45000000);
            case 900:return BigInt(50000000);
            case 901:return BigInt(50000000);
            case 902:return BigInt(50000000);
            case 903:return BigInt(50000000);
            case 904:return BigInt(50000000);
            case 905:return BigInt(50000000);
            case 906:return BigInt(50000000);
            case 907:return BigInt(50000000);
            case 908:return BigInt(50000000);
            case 909:return BigInt(50000000);
            case 910:return BigInt(50000000);
            case 911:return BigInt(50000000);
            case 912:return BigInt(50000000);
            case 913:return BigInt(50000000);
            case 914:return BigInt(50000000);
            case 915:return BigInt(50000000);
            case 916:return BigInt(50000000);
            case 917:return BigInt(50000000);
            case 918:return BigInt(50000000);
            case 919:return BigInt(50000000);
            case 920:return BigInt(50000000);
            case 921:return BigInt(50000000);
            case 922:return BigInt(50000000);
            case 923:return BigInt(50000000);
            case 924:return BigInt(50000000);
            case 925:return BigInt(50000000);
            case 926:return BigInt(50000000);
            case 927:return BigInt(50000000);
            case 928:return BigInt(50000000);
            case 929:return BigInt(50000000);
            case 930:return BigInt(50000000);
            case 931:return BigInt(50000000);
            case 932:return BigInt(50000000);
            case 933:return BigInt(50000000);
            case 934:return BigInt(50000000);
            case 935:return BigInt(50000000);
            case 936:return BigInt(50000000);
            case 937:return BigInt(50000000);
            case 938:return BigInt(50000000);
            case 939:return BigInt(50000000);
            case 940:return BigInt(50000000);
            case 941:return BigInt(50000000);
            case 942:return BigInt(50000000);
            case 943:return BigInt(50000000);
            case 944:return BigInt(50000000);
            case 945:return BigInt(50000000);
            case 946:return BigInt(50000000);
            case 947:return BigInt(50000000);
            case 948:return BigInt(50000000);
            case 949:return BigInt(50000000);
            case 950:return BigInt(60000000);
            case 951:return BigInt(60000000);
            case 952:return BigInt(60000000);
            case 953:return BigInt(60000000);
            case 954:return BigInt(60000000);
            case 955:return BigInt(60000000);
            case 956:return BigInt(60000000);
            case 957:return BigInt(60000000);
            case 958:return BigInt(60000000);
            case 959:return BigInt(60000000);
            case 960:return BigInt(60000000);
            case 961:return BigInt(60000000);
            case 962:return BigInt(60000000);
            case 963:return BigInt(60000000);
            case 964:return BigInt(60000000);
            case 965:return BigInt(60000000);
            case 966:return BigInt(60000000);
            case 967:return BigInt(60000000);
            case 968:return BigInt(60000000);
            case 969:return BigInt(60000000);
            case 970:return BigInt(60000000);
            case 971:return BigInt(60000000);
            case 972:return BigInt(60000000);
            case 973:return BigInt(60000000);
            case 974:return BigInt(60000000);
            case 975:return BigInt(60000000);
            case 976:return BigInt(60000000);
            case 977:return BigInt(60000000);
            case 978:return BigInt(60000000);
            case 979:return BigInt(60000000);
            case 980:return BigInt(60000000);
            case 981:return BigInt(60000000);
            case 982:return BigInt(60000000);
            case 983:return BigInt(60000000);
            case 984:return BigInt(60000000);
            case 985:return BigInt(60000000);
            case 986:return BigInt(60000000);
            case 987:return BigInt(60000000);
            case 988:return BigInt(60000000);
            case 989:return BigInt(60000000);
            case 990:return BigInt(60000000);
            case 991:return BigInt(60000000);
            case 992:return BigInt(60000000);
            case 993:return BigInt(60000000);
            case 994:return BigInt(60000000);
            case 995:return BigInt(60000000);
            case 996:return BigInt(60000000);
            case 997:return BigInt(60000000);
            case 998:return BigInt(60000000);
            case 999:return BigInt(60000000);
            case 1000:return BigInt(60000000);
        }
        return BigInt(1440000 * 10);
    }

    /*
     * 按等级返回总经验
     */
    public static getUserLevelFullExp(level: number): bigint
    {
        switch (level) {

            case 1:return BigInt(0);
            case 2:return BigInt(50);
            case 3:return BigInt(100);
            case 4:return BigInt(150);
            case 5:return BigInt(350);
            case 6:return BigInt(650);
            case 7:return BigInt(1050);
            case 8:return BigInt(1550);
            case 9:return BigInt(2150);
            case 10:return BigInt(3150);
            case 11:return BigInt(4350);
            case 12:return BigInt(5550);
            case 13:return BigInt(6950);
            case 14:return BigInt(8350);
            case 15:return BigInt(9850);
            case 16:return BigInt(11650);
            case 17:return BigInt(13750);
            case 18:return BigInt(16150);
            case 19:return BigInt(18850);
            case 20:return BigInt(21650);
            case 21:return BigInt(24850);
            case 22:return BigInt(28050);
            case 23:return BigInt(31250);
            case 24:return BigInt(34450);
            case 25:return BigInt(37950);
            case 26:return BigInt(41450);
            case 27:return BigInt(44950);
            case 28:return BigInt(48950);
            case 29:return BigInt(52950);
            case 30:return BigInt(57950);
            case 31:return BigInt(62950);
            case 32:return BigInt(72950);
            case 33:return BigInt(83950);
            case 34:return BigInt(95950);
            case 35:return BigInt(111950);
            case 36:return BigInt(129950);
            case 37:return BigInt(149950);
            case 38:return BigInt(171950);
            case 39:return BigInt(195950);
            case 40:return BigInt(222950);
            case 41:return BigInt(252950);
            case 42:return BigInt(285950);
            case 43:return BigInt(321950);
            case 44:return BigInt(360950);
            case 45:return BigInt(405950);
            case 46:return BigInt(455950);
            case 47:return BigInt(510950);
            case 48:return BigInt(570950);
            case 49:return BigInt(635950);
            case 50:return BigInt(710950);
            case 51:return BigInt(785950);
            case 52:return BigInt(860950);
            case 53:return BigInt(935950);
            case 54:return BigInt(1018450);
            case 55:return BigInt(1100950);
            case 56:return BigInt(1190950);
            case 57:return BigInt(1280950);
            case 58:return BigInt(1378450);
            case 59:return BigInt(1475950);
            case 60:return BigInt(1575950);
            case 61:return BigInt(1675950);
            case 62:return BigInt(1775950);
            case 63:return BigInt(1875950);
            case 64:return BigInt(1975950);
            case 65:return BigInt(2075950);
            case 66:return BigInt(2175950);
            case 67:return BigInt(2275950);
            case 68:return BigInt(2375950);
            case 69:return BigInt(2475950);
            case 70:return BigInt(2600950);
            case 71:return BigInt(2725950);
            case 72:return BigInt(2850950);
            case 73:return BigInt(2975950);
            case 74:return BigInt(3100950);
            case 75:return BigInt(3225950);
            case 76:return BigInt(3350950);
            case 77:return BigInt(3475950);
            case 78:return BigInt(3600950);
            case 79:return BigInt(3725950);
            case 80:return BigInt(3875950);
            case 81:return BigInt(4025950);
            case 82:return BigInt(4175950);
            case 83:return BigInt(4325950);
            case 84:return BigInt(4475950);
            case 85:return BigInt(4625950);
            case 86:return BigInt(4775950);
            case 87:return BigInt(4925950);
            case 88:return BigInt(5075950);
            case 89:return BigInt(5225950);
            case 90:return BigInt(5400950);
            case 91:return BigInt(5575950);
            case 92:return BigInt(5750950);
            case 93:return BigInt(5925950);
            case 94:return BigInt(6100950);
            case 95:return BigInt(6275950);
            case 96:return BigInt(6450950);
            case 97:return BigInt(6625950);
            case 98:return BigInt(6800950);
            case 99:return BigInt(6975950);
            case 100:return BigInt(7175950);
            case 101:return BigInt(7375950);
            case 102:return BigInt(7575950);
            case 103:return BigInt(7775950);
            case 104:return BigInt(7975950);
            case 105:return BigInt(8175950);
            case 106:return BigInt(8375950);
            case 107:return BigInt(8575950);
            case 108:return BigInt(8775950);
            case 109:return BigInt(8975950);
            case 110:return BigInt(9225950);
            case 111:return BigInt(9475950);
            case 112:return BigInt(9725950);
            case 113:return BigInt(9975950);
            case 114:return BigInt(10225950);
            case 115:return BigInt(10475950);
            case 116:return BigInt(10725950);
            case 117:return BigInt(10975950);
            case 118:return BigInt(11225950);
            case 119:return BigInt(11475950);
            case 120:return BigInt(11775950);
            case 121:return BigInt(12075950);
            case 122:return BigInt(12375950);
            case 123:return BigInt(12675950);
            case 124:return BigInt(12975950);
            case 125:return BigInt(13275950);
            case 126:return BigInt(13575950);
            case 127:return BigInt(13875950);
            case 128:return BigInt(14175950);
            case 129:return BigInt(14475950);
            case 130:return BigInt(14825950);
            case 131:return BigInt(15175950);
            case 132:return BigInt(15525950);
            case 133:return BigInt(15875950);
            case 134:return BigInt(16225950);
            case 135:return BigInt(16575950);
            case 136:return BigInt(16925950);
            case 137:return BigInt(17275950);
            case 138:return BigInt(17625950);
            case 139:return BigInt(17975950);
            case 140:return BigInt(18375950);
            case 141:return BigInt(18775950);
            case 142:return BigInt(19175950);
            case 143:return BigInt(19575950);
            case 144:return BigInt(19975950);
            case 145:return BigInt(20375950);
            case 146:return BigInt(20775950);
            case 147:return BigInt(21175950);
            case 148:return BigInt(21575950);
            case 149:return BigInt(21975950);
            case 150:return BigInt(22425950);
            case 151:return BigInt(22875950);
            case 152:return BigInt(23325950);
            case 153:return BigInt(23775950);
            case 154:return BigInt(24225950);
            case 155:return BigInt(24675950);
            case 156:return BigInt(25125950);
            case 157:return BigInt(25575950);
            case 158:return BigInt(26025950);
            case 159:return BigInt(26475950);
            case 160:return BigInt(26975950);
            case 161:return BigInt(27475950);
            case 162:return BigInt(27975950);
            case 163:return BigInt(28475950);
            case 164:return BigInt(28975950);
            case 165:return BigInt(29475950);
            case 166:return BigInt(29975950);
            case 167:return BigInt(30475950);
            case 168:return BigInt(30975950);
            case 169:return BigInt(31475950);
            case 170:return BigInt(31975950);
            case 171:return BigInt(32475950);
            case 172:return BigInt(32975950);
            case 173:return BigInt(33475950);
            case 174:return BigInt(33975950);
            case 175:return BigInt(34475950);
            case 176:return BigInt(34975950);
            case 177:return BigInt(35475950);
            case 178:return BigInt(35975950);
            case 179:return BigInt(36475950);
            case 180:return BigInt(37175950);
            case 181:return BigInt(37875950);
            case 182:return BigInt(38575950);
            case 183:return BigInt(39275950);
            case 184:return BigInt(39975950);
            case 185:return BigInt(40675950);
            case 186:return BigInt(41375950);
            case 187:return BigInt(42075950);
            case 188:return BigInt(42775950);
            case 189:return BigInt(43475950);
            case 190:return BigInt(44275950);
            case 191:return BigInt(45075950);
            case 192:return BigInt(45875950);
            case 193:return BigInt(46675950);
            case 194:return BigInt(47475950);
            case 195:return BigInt(48275950);
            case 196:return BigInt(49075950);
            case 197:return BigInt(49875950);
            case 198:return BigInt(50675950);
            case 199:return BigInt(51475950);
            case 200:return BigInt(52475950);
            case 201:return BigInt(53475950);
            case 202:return BigInt(54475950);
            case 203:return BigInt(55475950);
            case 204:return BigInt(56475950);
            case 205:return BigInt(57475950);
            case 206:return BigInt(58475950);
            case 207:return BigInt(59475950);
            case 208:return BigInt(60475950);
            case 209:return BigInt(61475950);
            case 210:return BigInt(62675950);
            case 211:return BigInt(63875950);
            case 212:return BigInt(65075950);
            case 213:return BigInt(66275950);
            case 214:return BigInt(67475950);
            case 215:return BigInt(68675950);
            case 216:return BigInt(69875950);
            case 217:return BigInt(71075950);
            case 218:return BigInt(72275950);
            case 219:return BigInt(73475950);
            case 220:return BigInt(74975950);
            case 221:return BigInt(76475950);
            case 222:return BigInt(77975950);
            case 223:return BigInt(79475950);
            case 224:return BigInt(80975950);
            case 225:return BigInt(82475950);
            case 226:return BigInt(83975950);
            case 227:return BigInt(85475950);
            case 228:return BigInt(86975950);
            case 229:return BigInt(88475950);
            case 230:return BigInt(89975950);
            case 231:return BigInt(91475950);
            case 232:return BigInt(92975950);
            case 233:return BigInt(94475950);
            case 234:return BigInt(95975950);
            case 235:return BigInt(97475950);
            case 236:return BigInt(98975950);
            case 237:return BigInt(100475950);
            case 238:return BigInt(101975950);
            case 239:return BigInt(103475950);
            case 240:return BigInt(105475950);
            case 241:return BigInt(107475950);
            case 242:return BigInt(109475950);
            case 243:return BigInt(111475950);
            case 244:return BigInt(113475950);
            case 245:return BigInt(115475950);
            case 246:return BigInt(117475950);
            case 247:return BigInt(119475950);
            case 248:return BigInt(121475950);
            case 249:return BigInt(123475950);
            case 250:return BigInt(125475950);
            case 251:return BigInt(127475950);
            case 252:return BigInt(129475950);
            case 253:return BigInt(131475950);
            case 254:return BigInt(133475950);
            case 255:return BigInt(135475950);
            case 256:return BigInt(137475950);
            case 257:return BigInt(139475950);
            case 258:return BigInt(141475950);
            case 259:return BigInt(143475950);
            case 260:return BigInt(145975950);
            case 261:return BigInt(148475950);
            case 262:return BigInt(150975950);
            case 263:return BigInt(153475950);
            case 264:return BigInt(155975950);
            case 265:return BigInt(158475950);
            case 266:return BigInt(160975950);
            case 267:return BigInt(163475950);
            case 268:return BigInt(165975950);
            case 269:return BigInt(168475950);
            case 270:return BigInt(170975950);
            case 271:return BigInt(173475950);
            case 272:return BigInt(175975950);
            case 273:return BigInt(178475950);
            case 274:return BigInt(180975950);
            case 275:return BigInt(183475950);
            case 276:return BigInt(185975950);
            case 277:return BigInt(188475950);
            case 278:return BigInt(190975950);
            case 279:return BigInt(193475950);
            case 280:return BigInt(196475950);
            case 281:return BigInt(199475950);
            case 282:return BigInt(202475950);
            case 283:return BigInt(205475950);
            case 284:return BigInt(208475950);
            case 285:return BigInt(211475950);
            case 286:return BigInt(214475950);
            case 287:return BigInt(217475950);
            case 288:return BigInt(220475950);
            case 289:return BigInt(223475950);
            case 290:return BigInt(226475950);
            case 291:return BigInt(229475950);
            case 292:return BigInt(232475950);
            case 293:return BigInt(235475950);
            case 294:return BigInt(238475950);
            case 295:return BigInt(241475950);
            case 296:return BigInt(244475950);
            case 297:return BigInt(247475950);
            case 298:return BigInt(250475950);
            case 299:return BigInt(253475950);
            case 300:return BigInt(256975950);
            case 301:return BigInt(260475950);
            case 302:return BigInt(263975950);
            case 303:return BigInt(267475950);
            case 304:return BigInt(270975950);
            case 305:return BigInt(274475950);
            case 306:return BigInt(277975950);
            case 307:return BigInt(281475950);
            case 308:return BigInt(284975950);
            case 309:return BigInt(288475950);
            case 310:return BigInt(291975950);
            case 311:return BigInt(295475950);
            case 312:return BigInt(298975950);
            case 313:return BigInt(302475950);
            case 314:return BigInt(305975950);
            case 315:return BigInt(309475950);
            case 316:return BigInt(312975950);
            case 317:return BigInt(316475950);
            case 318:return BigInt(319975950);
            case 319:return BigInt(323475950);
            case 320:return BigInt(327475950);
            case 321:return BigInt(331475950);
            case 322:return BigInt(335475950);
            case 323:return BigInt(339475950);
            case 324:return BigInt(343475950);
            case 325:return BigInt(347475950);
            case 326:return BigInt(351475950);
            case 327:return BigInt(355475950);
            case 328:return BigInt(359475950);
            case 329:return BigInt(363475950);
            case 330:return BigInt(367475950);
            case 331:return BigInt(371475950);
            case 332:return BigInt(375475950);
            case 333:return BigInt(379475950);
            case 334:return BigInt(383475950);
            case 335:return BigInt(387475950);
            case 336:return BigInt(391475950);
            case 337:return BigInt(395475950);
            case 338:return BigInt(399475950);
            case 339:return BigInt(403475950);
            case 340:return BigInt(407475950);
            case 341:return BigInt(411475950);
            case 342:return BigInt(415475950);
            case 343:return BigInt(419475950);
            case 344:return BigInt(423475950);
            case 345:return BigInt(427475950);
            case 346:return BigInt(431475950);
            case 347:return BigInt(435475950);
            case 348:return BigInt(439475950);
            case 349:return BigInt(443475950);
            case 350:return BigInt(447975950);
            case 351:return BigInt(452475950);
            case 352:return BigInt(456975950);
            case 353:return BigInt(461475950);
            case 354:return BigInt(465975950);
            case 355:return BigInt(470475950);
            case 356:return BigInt(474975950);
            case 357:return BigInt(479475950);
            case 358:return BigInt(483975950);
            case 359:return BigInt(488475950);
            case 360:return BigInt(492975950);
            case 361:return BigInt(497475950);
            case 362:return BigInt(501975950);
            case 363:return BigInt(506475950);
            case 364:return BigInt(510975950);
            case 365:return BigInt(515475950);
            case 366:return BigInt(519975950);
            case 367:return BigInt(524475950);
            case 368:return BigInt(528975950);
            case 369:return BigInt(533475950);
            case 370:return BigInt(537975950);
            case 371:return BigInt(542475950);
            case 372:return BigInt(546975950);
            case 373:return BigInt(551475950);
            case 374:return BigInt(555975950);
            case 375:return BigInt(560475950);
            case 376:return BigInt(564975950);
            case 377:return BigInt(569475950);
            case 378:return BigInt(573975950);
            case 379:return BigInt(578475950);
            case 380:return BigInt(583475950);
            case 381:return BigInt(588475950);
            case 382:return BigInt(593475950);
            case 383:return BigInt(598475950);
            case 384:return BigInt(603475950);
            case 385:return BigInt(608475950);
            case 386:return BigInt(613475950);
            case 387:return BigInt(618475950);
            case 388:return BigInt(623475950);
            case 389:return BigInt(628475950);
            case 390:return BigInt(633475950);
            case 391:return BigInt(638475950);
            case 392:return BigInt(643475950);
            case 393:return BigInt(648475950);
            case 394:return BigInt(653475950);
            case 395:return BigInt(658475950);
            case 396:return BigInt(663475950);
            case 397:return BigInt(668475950);
            case 398:return BigInt(673475950);
            case 399:return BigInt(678475950);
            case 400:return BigInt(683475950);
            case 401:return BigInt(688475950);
            case 402:return BigInt(693475950);
            case 403:return BigInt(698475950);
            case 404:return BigInt(703475950);
            case 405:return BigInt(708475950);
            case 406:return BigInt(713475950);
            case 407:return BigInt(718475950);
            case 408:return BigInt(723475950);
            case 409:return BigInt(728475950);
            case 410:return BigInt(733975950);
            case 411:return BigInt(739475950);
            case 412:return BigInt(744975950);
            case 413:return BigInt(750475950);
            case 414:return BigInt(755975950);
            case 415:return BigInt(761475950);
            case 416:return BigInt(766975950);
            case 417:return BigInt(772475950);
            case 418:return BigInt(777975950);
            case 419:return BigInt(783475950);
            case 420:return BigInt(788975950);
            case 421:return BigInt(794475950);
            case 422:return BigInt(799975950);
            case 423:return BigInt(805475950);
            case 424:return BigInt(810975950);
            case 425:return BigInt(816475950);
            case 426:return BigInt(821975950);
            case 427:return BigInt(827475950);
            case 428:return BigInt(832975950);
            case 429:return BigInt(838475950);
            case 430:return BigInt(844475950);
            case 431:return BigInt(850475950);
            case 432:return BigInt(856475950);
            case 433:return BigInt(862475950);
            case 434:return BigInt(868475950);
            case 435:return BigInt(874475950);
            case 436:return BigInt(880475950);
            case 437:return BigInt(886475950);
            case 438:return BigInt(892475950);
            case 439:return BigInt(898475950);
            case 440:return BigInt(904475950);
            case 441:return BigInt(910475950);
            case 442:return BigInt(916475950);
            case 443:return BigInt(922475950);
            case 444:return BigInt(928475950);
            case 445:return BigInt(934475950);
            case 446:return BigInt(940475950);
            case 447:return BigInt(946475950);
            case 448:return BigInt(952475950);
            case 449:return BigInt(958475950);
            case 450:return BigInt(964975950);
            case 451:return BigInt(971475950);
            case 452:return BigInt(977975950);
            case 453:return BigInt(984475950);
            case 454:return BigInt(990975950);
            case 455:return BigInt(997475950);
            case 456:return BigInt(1003975950);
            case 457:return BigInt(1010475950);
            case 458:return BigInt(1016975950);
            case 459:return BigInt(1023475950);
            case 460:return BigInt(1029975950);
            case 461:return BigInt(1036475950);
            case 462:return BigInt(1042975950);
            case 463:return BigInt(1049475950);
            case 464:return BigInt(1055975950);
            case 465:return BigInt(1062475950);
            case 466:return BigInt(1068975950);
            case 467:return BigInt(1075475950);
            case 468:return BigInt(1081975950);
            case 469:return BigInt(1088475950);
            case 470:return BigInt(1095475950);
            case 471:return BigInt(1102475950);
            case 472:return BigInt(1109475950);
            case 473:return BigInt(1116475950);
            case 474:return BigInt(1123475950);
            case 475:return BigInt(1130475950);
            case 476:return BigInt(1137475950);
            case 477:return BigInt(1144475950);
            case 478:return BigInt(1151475950);
            case 479:return BigInt(1158475950);
            case 480:return BigInt(1165475950);
            case 481:return BigInt(1172475950);
            case 482:return BigInt(1179475950);
            case 483:return BigInt(1186475950);
            case 484:return BigInt(1193475950);
            case 485:return BigInt(1200475950);
            case 486:return BigInt(1207475950);
            case 487:return BigInt(1214475950);
            case 488:return BigInt(1221475950);
            case 489:return BigInt(1228475950);
            case 490:return BigInt(1235475950);
            case 491:return BigInt(1242475950);
            case 492:return BigInt(1249475950);
            case 493:return BigInt(1256475950);
            case 494:return BigInt(1263475950);
            case 495:return BigInt(1270475950);
            case 496:return BigInt(1277475950);
            case 497:return BigInt(1284475950);
            case 498:return BigInt(1291475950);
            case 499:return BigInt(1298475950);
            case 500:return BigInt(1306475950);
            case 501:return BigInt(1314475950);
            case 502:return BigInt(1322475950);
            case 503:return BigInt(1330475950);
            case 504:return BigInt(1338475950);
            case 505:return BigInt(1346475950);
            case 506:return BigInt(1354475950);
            case 507:return BigInt(1362475950);
            case 508:return BigInt(1370475950);
            case 509:return BigInt(1378475950);
            case 510:return BigInt(1386475950);
            case 511:return BigInt(1394475950);
            case 512:return BigInt(1402475950);
            case 513:return BigInt(1410475950);
            case 514:return BigInt(1418475950);
            case 515:return BigInt(1426475950);
            case 516:return BigInt(1434475950);
            case 517:return BigInt(1442475950);
            case 518:return BigInt(1450475950);
            case 519:return BigInt(1458475950);
            case 520:return BigInt(1466475950);
            case 521:return BigInt(1474475950);
            case 522:return BigInt(1482475950);
            case 523:return BigInt(1490475950);
            case 524:return BigInt(1498475950);
            case 525:return BigInt(1506475950);
            case 526:return BigInt(1514475950);
            case 527:return BigInt(1522475950);
            case 528:return BigInt(1530475950);
            case 529:return BigInt(1538475950);
            case 530:return BigInt(1547475950);
            case 531:return BigInt(1556475950);
            case 532:return BigInt(1565475950);
            case 533:return BigInt(1574475950);
            case 534:return BigInt(1583475950);
            case 535:return BigInt(1592475950);
            case 536:return BigInt(1601475950);
            case 537:return BigInt(1610475950);
            case 538:return BigInt(1619475950);
            case 539:return BigInt(1628475950);
            case 540:return BigInt(1637475950);
            case 541:return BigInt(1646475950);
            case 542:return BigInt(1655475950);
            case 543:return BigInt(1664475950);
            case 544:return BigInt(1673475950);
            case 545:return BigInt(1682475950);
            case 546:return BigInt(1691475950);
            case 547:return BigInt(1700475950);
            case 548:return BigInt(1709475950);
            case 549:return BigInt(1718475950);
            case 550:return BigInt(1727475950);
            case 551:return BigInt(1736475950);
            case 552:return BigInt(1745475950);
            case 553:return BigInt(1754475950);
            case 554:return BigInt(1763475950);
            case 555:return BigInt(1772475950);
            case 556:return BigInt(1781475950);
            case 557:return BigInt(1790475950);
            case 558:return BigInt(1799475950);
            case 559:return BigInt(1808475950);
            case 560:return BigInt(1818475950);
            case 561:return BigInt(1828475950);
            case 562:return BigInt(1838475950);
            case 563:return BigInt(1848475950);
            case 564:return BigInt(1858475950);
            case 565:return BigInt(1868475950);
            case 566:return BigInt(1878475950);
            case 567:return BigInt(1888475950);
            case 568:return BigInt(1898475950);
            case 569:return BigInt(1908475950);
            case 570:return BigInt(1918475950);
            case 571:return BigInt(1928475950);
            case 572:return BigInt(1938475950);
            case 573:return BigInt(1948475950);
            case 574:return BigInt(1958475950);
            case 575:return BigInt(1968475950);
            case 576:return BigInt(1978475950);
            case 577:return BigInt(1988475950);
            case 578:return BigInt(1998475950);
            case 579:return BigInt(2008475950);
            case 580:return BigInt(2018475950);
            case 581:return BigInt(2028475950);
            case 582:return BigInt(2038475950);
            case 583:return BigInt(2048475950);
            case 584:return BigInt(2058475950);
            case 585:return BigInt(2068475950);
            case 586:return BigInt(2078475950);
            case 587:return BigInt(2088475950);
            case 588:return BigInt(2098475950);
            case 589:return BigInt(2108475950);
            case 590:return BigInt(2118475950);
            case 591:return BigInt(2128475950);
            case 592:return BigInt(2138475950);
            case 593:return BigInt(2148475950);
            case 594:return BigInt(2158475950);
            case 595:return BigInt(2168475950);
            case 596:return BigInt(2178475950);
            case 597:return BigInt(2188475950);
            case 598:return BigInt(2198475950);
            case 599:return BigInt(2209475950);
            case 600:return BigInt(2220475950);
            case 601:return BigInt(2231475950);
            case 602:return BigInt(2242475950);
            case 603:return BigInt(2253475950);
            case 604:return BigInt(2264475950);
            case 605:return BigInt(2275475950);
            case 606:return BigInt(2286475950);
            case 607:return BigInt(2297475950);
            case 608:return BigInt(2308475950);
            case 609:return BigInt(2319475950);
            case 610:return BigInt(2330475950);
            case 611:return BigInt(2341475950);
            case 612:return BigInt(2352475950);
            case 613:return BigInt(2363475950);
            case 614:return BigInt(2374475950);
            case 615:return BigInt(2385475950);
            case 616:return BigInt(2396475950);
            case 617:return BigInt(2407475950);
            case 618:return BigInt(2418475950);
            case 619:return BigInt(2429475950);
            case 620:return BigInt(2441475950);
            case 621:return BigInt(2453475950);
            case 622:return BigInt(2465475950);
            case 623:return BigInt(2477475950);
            case 624:return BigInt(2489475950);
            case 625:return BigInt(2501475950);
            case 626:return BigInt(2513475950);
            case 627:return BigInt(2525475950);
            case 628:return BigInt(2537475950);
            case 629:return BigInt(2549475950);
            case 630:return BigInt(2561475950);
            case 631:return BigInt(2573475950);
            case 632:return BigInt(2585475950);
            case 633:return BigInt(2597475950);
            case 634:return BigInt(2609475950);
            case 635:return BigInt(2621475950);
            case 636:return BigInt(2633475950);
            case 637:return BigInt(2645475950);
            case 638:return BigInt(2657475950);
            case 639:return BigInt(2669475950);
            case 640:return BigInt(2682475950);
            case 641:return BigInt(2695475950);
            case 642:return BigInt(2708475950);
            case 643:return BigInt(2721475950);
            case 644:return BigInt(2734475950);
            case 645:return BigInt(2747475950);
            case 646:return BigInt(2760475950);
            case 647:return BigInt(2773475950);
            case 648:return BigInt(2786475950);
            case 649:return BigInt(2799475950);
            case 650:return BigInt(2812475950);
            case 651:return BigInt(2825475950);
            case 652:return BigInt(2838475950);
            case 653:return BigInt(2851475950);
            case 654:return BigInt(2864475950);
            case 655:return BigInt(2877475950);
            case 656:return BigInt(2890475950);
            case 657:return BigInt(2903475950);
            case 658:return BigInt(2916475950);
            case 659:return BigInt(2929475950);
            case 660:return BigInt(2943475950);
            case 661:return BigInt(2957475950);
            case 662:return BigInt(2971475950);
            case 663:return BigInt(2985475950);
            case 664:return BigInt(2999475950);
            case 665:return BigInt(3013475950);
            case 666:return BigInt(3027475950);
            case 667:return BigInt(3041475950);
            case 668:return BigInt(3055475950);
            case 669:return BigInt(3069475950);
            case 670:return BigInt(3083475950);
            case 671:return BigInt(3097475950);
            case 672:return BigInt(3111475950);
            case 673:return BigInt(3125475950);
            case 674:return BigInt(3139475950);
            case 675:return BigInt(3153475950);
            case 676:return BigInt(3167475950);
            case 677:return BigInt(3181475950);
            case 678:return BigInt(3195475950);
            case 679:return BigInt(3209475950);
            case 680:return BigInt(3224475950);
            case 681:return BigInt(3239475950);
            case 682:return BigInt(3254475950);
            case 683:return BigInt(3269475950);
            case 684:return BigInt(3284475950);
            case 685:return BigInt(3299475950);
            case 686:return BigInt(3314475950);
            case 687:return BigInt(3329475950);
            case 688:return BigInt(3344475950);
            case 689:return BigInt(3359475950);
            case 690:return BigInt(3374475950);
            case 691:return BigInt(3389475950);
            case 692:return BigInt(3404475950);
            case 693:return BigInt(3419475950);
            case 694:return BigInt(3434475950);
            case 695:return BigInt(3449475950);
            case 696:return BigInt(3464475950);
            case 697:return BigInt(3479475950);
            case 698:return BigInt(3494475950);
            case 699:return BigInt(3509475950);
            case 700:return BigInt(3529475950);
            case 701:return BigInt(3549475950);
            case 702:return BigInt(3569475950);
            case 703:return BigInt(3589475950);
            case 704:return BigInt(3609475950);
            case 705:return BigInt(3629475950);
            case 706:return BigInt(3649475950);
            case 707:return BigInt(3669475950);
            case 708:return BigInt(3689475950);
            case 709:return BigInt(3709475950);
            case 710:return BigInt(3729475950);
            case 711:return BigInt(3749475950);
            case 712:return BigInt(3769475950);
            case 713:return BigInt(3789475950);
            case 714:return BigInt(3809475950);
            case 715:return BigInt(3829475950);
            case 716:return BigInt(3849475950);
            case 717:return BigInt(3869475950);
            case 718:return BigInt(3889475950);
            case 719:return BigInt(3909475950);
            case 720:return BigInt(3931475950);
            case 721:return BigInt(3953475950);
            case 722:return BigInt(3975475950);
            case 723:return BigInt(3997475950);
            case 724:return BigInt(4019475950);
            case 725:return BigInt(4041475950);
            case 726:return BigInt(4063475950);
            case 727:return BigInt(4085475950);
            case 728:return BigInt(4107475950);
            case 729:return BigInt(4129475950);
            case 730:return BigInt(4151475950);
            case 731:return BigInt(4173475950);
            case 732:return BigInt(4195475950);
            case 733:return BigInt(4217475950);
            case 734:return BigInt(4239475950);
            case 735:return BigInt(4261475950);
            case 736:return BigInt(4283475950);
            case 737:return BigInt(4305475950);
            case 738:return BigInt(4327475950);
            case 739:return BigInt(4349475950);
            case 740:return BigInt(4374475950);
            case 741:return BigInt(4399475950);
            case 742:return BigInt(4424475950);
            case 743:return BigInt(4449475950);
            case 744:return BigInt(4474475950);
            case 745:return BigInt(4499475950);
            case 746:return BigInt(4524475950);
            case 747:return BigInt(4549475950);
            case 748:return BigInt(4574475950);
            case 749:return BigInt(4599475950);
            case 750:return BigInt(4624475950);
            case 751:return BigInt(4649475950);
            case 752:return BigInt(4674475950);
            case 753:return BigInt(4699475950);
            case 754:return BigInt(4724475950);
            case 755:return BigInt(4749475950);
            case 756:return BigInt(4774475950);
            case 757:return BigInt(4799475950);
            case 758:return BigInt(4824475950);
            case 759:return BigInt(4849475950);
            case 760:return BigInt(4879475950);
            case 761:return BigInt(4909475950);
            case 762:return BigInt(4939475950);
            case 763:return BigInt(4969475950);
            case 764:return BigInt(4999475950);
            case 765:return BigInt(5029475950);
            case 766:return BigInt(5059475950);
            case 767:return BigInt(5089475950);
            case 768:return BigInt(5119475950);
            case 769:return BigInt(5149475950);
            case 770:return BigInt(5179475950);
            case 771:return BigInt(5209475950);
            case 772:return BigInt(5239475950);
            case 773:return BigInt(5269475950);
            case 774:return BigInt(5299475950);
            case 775:return BigInt(5329475950);
            case 776:return BigInt(5359475950);
            case 777:return BigInt(5389475950);
            case 778:return BigInt(5419475950);
            case 779:return BigInt(5449475950);
            case 780:return BigInt(5484475950);
            case 781:return BigInt(5519475950);
            case 782:return BigInt(5554475950);
            case 783:return BigInt(5589475950);
            case 784:return BigInt(5624475950);
            case 785:return BigInt(5659475950);
            case 786:return BigInt(5694475950);
            case 787:return BigInt(5729475950);
            case 788:return BigInt(5764475950);
            case 789:return BigInt(5799475950);
            case 790:return BigInt(5834475950);
            case 791:return BigInt(5869475950);
            case 792:return BigInt(5904475950);
            case 793:return BigInt(5939475950);
            case 794:return BigInt(5974475950);
            case 795:return BigInt(6009475950);
            case 796:return BigInt(6044475950);
            case 797:return BigInt(6079475950);
            case 798:return BigInt(6114475950);
            case 799:return BigInt(6149475950);
            case 800:return BigInt(6189475950);
            case 801:return BigInt(6229475950);
            case 802:return BigInt(6269475950);
            case 803:return BigInt(6309475950);
            case 804:return BigInt(6349475950);
            case 805:return BigInt(6389475950);
            case 806:return BigInt(6429475950);
            case 807:return BigInt(6469475950);
            case 808:return BigInt(6509475950);
            case 809:return BigInt(6549475950);
            case 810:return BigInt(6589475950);
            case 811:return BigInt(6629475950);
            case 812:return BigInt(6669475950);
            case 813:return BigInt(6709475950);
            case 814:return BigInt(6749475950);
            case 815:return BigInt(6789475950);
            case 816:return BigInt(6829475950);
            case 817:return BigInt(6869475950);
            case 818:return BigInt(6909475950);
            case 819:return BigInt(6949475950);
            case 820:return BigInt(6989475950);
            case 821:return BigInt(7029475950);
            case 822:return BigInt(7069475950);
            case 823:return BigInt(7109475950);
            case 824:return BigInt(7149475950);
            case 825:return BigInt(7189475950);
            case 826:return BigInt(7229475950);
            case 827:return BigInt(7269475950);
            case 828:return BigInt(7309475950);
            case 829:return BigInt(7349475950);
            case 830:return BigInt(7389475950);
            case 831:return BigInt(7429475950);
            case 832:return BigInt(7469475950);
            case 833:return BigInt(7509475950);
            case 834:return BigInt(7549475950);
            case 835:return BigInt(7589475950);
            case 836:return BigInt(7629475950);
            case 837:return BigInt(7669475950);
            case 838:return BigInt(7709475950);
            case 839:return BigInt(7749475950);
            case 840:return BigInt(7789475950);
            case 841:return BigInt(7829475950);
            case 842:return BigInt(7869475950);
            case 843:return BigInt(7909475950);
            case 844:return BigInt(7949475950);
            case 845:return BigInt(7989475950);
            case 846:return BigInt(8029475950);
            case 847:return BigInt(8069475950);
            case 848:return BigInt(8109475950);
            case 849:return BigInt(8149475950);
            case 850:return BigInt(8194475950);
            case 851:return BigInt(8239475950);
            case 852:return BigInt(8284475950);
            case 853:return BigInt(8329475950);
            case 854:return BigInt(8374475950);
            case 855:return BigInt(8419475950);
            case 856:return BigInt(8464475950);
            case 857:return BigInt(8509475950);
            case 858:return BigInt(8554475950);
            case 859:return BigInt(8599475950);
            case 860:return BigInt(8644475950);
            case 861:return BigInt(8689475950);
            case 862:return BigInt(8734475950);
            case 863:return BigInt(8779475950);
            case 864:return BigInt(8824475950);
            case 865:return BigInt(8869475950);
            case 866:return BigInt(8914475950);
            case 867:return BigInt(8959475950);
            case 868:return BigInt(9004475950);
            case 869:return BigInt(9049475950);
            case 870:return BigInt(9094475950);
            case 871:return BigInt(9139475950);
            case 872:return BigInt(9184475950);
            case 873:return BigInt(9229475950);
            case 874:return BigInt(9274475950);
            case 875:return BigInt(9319475950);
            case 876:return BigInt(9364475950);
            case 877:return BigInt(9409475950);
            case 878:return BigInt(9454475950);
            case 879:return BigInt(9499475950);
            case 880:return BigInt(9544475950);
            case 881:return BigInt(9589475950);
            case 882:return BigInt(9634475950);
            case 883:return BigInt(9679475950);
            case 884:return BigInt(9724475950);
            case 885:return BigInt(9769475950);
            case 886:return BigInt(9814475950);
            case 887:return BigInt(9859475950);
            case 888:return BigInt(9904475950);
            case 889:return BigInt(9949475950);
            case 890:return BigInt(9994475950);
            case 891:return BigInt(10039475950);
            case 892:return BigInt(10084475950);
            case 893:return BigInt(10129475950);
            case 894:return BigInt(10174475950);
            case 895:return BigInt(10219475950);
            case 896:return BigInt(10264475950);
            case 897:return BigInt(10309475950);
            case 898:return BigInt(10354475950);
            case 899:return BigInt(10399475950);
            case 900:return BigInt(10449475950);
            case 901:return BigInt(10499475950);
            case 902:return BigInt(10549475950);
            case 903:return BigInt(10599475950);
            case 904:return BigInt(10649475950);
            case 905:return BigInt(10699475950);
            case 906:return BigInt(10749475950);
            case 907:return BigInt(10799475950);
            case 908:return BigInt(10849475950);
            case 909:return BigInt(10899475950);
            case 910:return BigInt(10949475950);
            case 911:return BigInt(10999475950);
            case 912:return BigInt(11049475950);
            case 913:return BigInt(11099475950);
            case 914:return BigInt(11149475950);
            case 915:return BigInt(11199475950);
            case 916:return BigInt(11249475950);
            case 917:return BigInt(11299475950);
            case 918:return BigInt(11349475950);
            case 919:return BigInt(11399475950);
            case 920:return BigInt(11449475950);
            case 921:return BigInt(11499475950);
            case 922:return BigInt(11549475950);
            case 923:return BigInt(11599475950);
            case 924:return BigInt(11649475950);
            case 925:return BigInt(11699475950);
            case 926:return BigInt(11749475950);
            case 927:return BigInt(11799475950);
            case 928:return BigInt(11849475950);
            case 929:return BigInt(11899475950);
            case 930:return BigInt(11949475950);
            case 931:return BigInt(11999475950);
            case 932:return BigInt(12049475950);
            case 933:return BigInt(12099475950);
            case 934:return BigInt(12149475950);
            case 935:return BigInt(12199475950);
            case 936:return BigInt(12249475950);
            case 937:return BigInt(12299475950);
            case 938:return BigInt(12349475950);
            case 939:return BigInt(12399475950);
            case 940:return BigInt(12449475950);
            case 941:return BigInt(12499475950);
            case 942:return BigInt(12549475950);
            case 943:return BigInt(12599475950);
            case 944:return BigInt(12649475950);
            case 945:return BigInt(12699475950);
            case 946:return BigInt(12749475950);
            case 947:return BigInt(12799475950);
            case 948:return BigInt(12849475950);
            case 949:return BigInt(12899475950);
            case 950:return BigInt(12959475950);
            case 951:return BigInt(13019475950);
            case 952:return BigInt(13079475950);
            case 953:return BigInt(13139475950);
            case 954:return BigInt(13199475950);
            case 955:return BigInt(13259475950);
            case 956:return BigInt(13319475950);
            case 957:return BigInt(13379475950);
            case 958:return BigInt(13439475950);
            case 959:return BigInt(13499475950);
            case 960:return BigInt(13559475950);
            case 961:return BigInt(13619475950);
            case 962:return BigInt(13679475950);
            case 963:return BigInt(13739475950);
            case 964:return BigInt(13799475950);
            case 965:return BigInt(13859475950);
            case 966:return BigInt(13919475950);
            case 967:return BigInt(13979475950);
            case 968:return BigInt(14039475950);
            case 969:return BigInt(14099475950);
            case 970:return BigInt(14159475950);
            case 971:return BigInt(14219475950);
            case 972:return BigInt(14279475950);
            case 973:return BigInt(14339475950);
            case 974:return BigInt(14399475950);
            case 975:return BigInt(14459475950);
            case 976:return BigInt(14519475950);
            case 977:return BigInt(14579475950);
            case 978:return BigInt(14639475950);
            case 979:return BigInt(14699475950);
            case 980:return BigInt(14759475950);
            case 981:return BigInt(14819475950);
            case 982:return BigInt(14879475950);
            case 983:return BigInt(14939475950);
            case 984:return BigInt(14999475950);
            case 985:return BigInt(15059475950);
            case 986:return BigInt(15119475950);
            case 987:return BigInt(15179475950);
            case 988:return BigInt(15239475950);
            case 989:return BigInt(15299475950);
            case 990:return BigInt(15359475950);
            case 991:return BigInt(15419475950);
            case 992:return BigInt(15479475950);
            case 993:return BigInt(15539475950);
            case 994:return BigInt(15599475950);
            case 995:return BigInt(15659475950);
            case 996:return BigInt(15719475950);
            case 997:return BigInt(15779475950);
            case 998:return BigInt(15839475950);
            case 999:return BigInt(15899475950);
            case 1000:return BigInt(15959475950);
        }
        return BigInt(3983910650 * 10);
    }

    /*
     * 按总经验返回等级
     */
    public static getUserExpFullLevel(checkExp: bigint): number
    {
        if(checkExp<=BigInt(4350))
        {
        if(checkExp>=BigInt(4350))
        return 11;
        if(checkExp>=BigInt(3150))
        return 10;
        if(checkExp>=BigInt(2150))
        return 9;
        if(checkExp>=BigInt(1550))
        return 8;
        if(checkExp>=BigInt(1050))
        return 7;
        if(checkExp>=BigInt(650))
        return 6;
        if(checkExp>=BigInt(350))
        return 5;
        if(checkExp>=BigInt(150))
        return 4;
        if(checkExp>=BigInt(100))
        return 3;
        if(checkExp>=BigInt(50))
        return 2;
        if(checkExp>=BigInt(0))
        return 1;
        return 1;
        }
        if(checkExp<=BigInt(28050))
        {
        if(checkExp>=BigInt(28050))
        return 22;
        if(checkExp>=BigInt(24850))
        return 21;
        if(checkExp>=BigInt(21650))
        return 20;
        if(checkExp>=BigInt(18850))
        return 19;
        if(checkExp>=BigInt(16150))
        return 18;
        if(checkExp>=BigInt(13750))
        return 17;
        if(checkExp>=BigInt(11650))
        return 16;
        if(checkExp>=BigInt(9850))
        return 15;
        if(checkExp>=BigInt(8350))
        return 14;
        if(checkExp>=BigInt(6950))
        return 13;
        if(checkExp>=BigInt(5550))
        return 12;
        return 11;
        }
        if(checkExp<=BigInt(83950))
        {
        if(checkExp>=BigInt(83950))
        return 33;
        if(checkExp>=BigInt(72950))
        return 32;
        if(checkExp>=BigInt(62950))
        return 31;
        if(checkExp>=BigInt(57950))
        return 30;
        if(checkExp>=BigInt(52950))
        return 29;
        if(checkExp>=BigInt(48950))
        return 28;
        if(checkExp>=BigInt(44950))
        return 27;
        if(checkExp>=BigInt(41450))
        return 26;
        if(checkExp>=BigInt(37950))
        return 25;
        if(checkExp>=BigInt(34450))
        return 24;
        if(checkExp>=BigInt(31250))
        return 23;
        return 22;
        }
        if(checkExp<=BigInt(360950))
        {
        if(checkExp>=BigInt(360950))
        return 44;
        if(checkExp>=BigInt(321950))
        return 43;
        if(checkExp>=BigInt(285950))
        return 42;
        if(checkExp>=BigInt(252950))
        return 41;
        if(checkExp>=BigInt(222950))
        return 40;
        if(checkExp>=BigInt(195950))
        return 39;
        if(checkExp>=BigInt(171950))
        return 38;
        if(checkExp>=BigInt(149950))
        return 37;
        if(checkExp>=BigInt(129950))
        return 36;
        if(checkExp>=BigInt(111950))
        return 35;
        if(checkExp>=BigInt(95950))
        return 34;
        return 33;
        }
        if(checkExp<=BigInt(1100950))
        {
        if(checkExp>=BigInt(1100950))
        return 55;
        if(checkExp>=BigInt(1018450))
        return 54;
        if(checkExp>=BigInt(935950))
        return 53;
        if(checkExp>=BigInt(860950))
        return 52;
        if(checkExp>=BigInt(785950))
        return 51;
        if(checkExp>=BigInt(710950))
        return 50;
        if(checkExp>=BigInt(635950))
        return 49;
        if(checkExp>=BigInt(570950))
        return 48;
        if(checkExp>=BigInt(510950))
        return 47;
        if(checkExp>=BigInt(455950))
        return 46;
        if(checkExp>=BigInt(405950))
        return 45;
        return 44;
        }
        if(checkExp<=BigInt(2175950))
        {
        if(checkExp>=BigInt(2175950))
        return 66;
        if(checkExp>=BigInt(2075950))
        return 65;
        if(checkExp>=BigInt(1975950))
        return 64;
        if(checkExp>=BigInt(1875950))
        return 63;
        if(checkExp>=BigInt(1775950))
        return 62;
        if(checkExp>=BigInt(1675950))
        return 61;
        if(checkExp>=BigInt(1575950))
        return 60;
        if(checkExp>=BigInt(1475950))
        return 59;
        if(checkExp>=BigInt(1378450))
        return 58;
        if(checkExp>=BigInt(1280950))
        return 57;
        if(checkExp>=BigInt(1190950))
        return 56;
        return 55;
        }
        if(checkExp<=BigInt(3475950))
        {
        if(checkExp>=BigInt(3475950))
        return 77;
        if(checkExp>=BigInt(3350950))
        return 76;
        if(checkExp>=BigInt(3225950))
        return 75;
        if(checkExp>=BigInt(3100950))
        return 74;
        if(checkExp>=BigInt(2975950))
        return 73;
        if(checkExp>=BigInt(2850950))
        return 72;
        if(checkExp>=BigInt(2725950))
        return 71;
        if(checkExp>=BigInt(2600950))
        return 70;
        if(checkExp>=BigInt(2475950))
        return 69;
        if(checkExp>=BigInt(2375950))
        return 68;
        if(checkExp>=BigInt(2275950))
        return 67;
        return 66;
        }
        if(checkExp<=BigInt(5075950))
        {
        if(checkExp>=BigInt(5075950))
        return 88;
        if(checkExp>=BigInt(4925950))
        return 87;
        if(checkExp>=BigInt(4775950))
        return 86;
        if(checkExp>=BigInt(4625950))
        return 85;
        if(checkExp>=BigInt(4475950))
        return 84;
        if(checkExp>=BigInt(4325950))
        return 83;
        if(checkExp>=BigInt(4175950))
        return 82;
        if(checkExp>=BigInt(4025950))
        return 81;
        if(checkExp>=BigInt(3875950))
        return 80;
        if(checkExp>=BigInt(3725950))
        return 79;
        if(checkExp>=BigInt(3600950))
        return 78;
        return 77;
        }
        if(checkExp<=BigInt(6975950))
        {
        if(checkExp>=BigInt(6975950))
        return 99;
        if(checkExp>=BigInt(6800950))
        return 98;
        if(checkExp>=BigInt(6625950))
        return 97;
        if(checkExp>=BigInt(6450950))
        return 96;
        if(checkExp>=BigInt(6275950))
        return 95;
        if(checkExp>=BigInt(6100950))
        return 94;
        if(checkExp>=BigInt(5925950))
        return 93;
        if(checkExp>=BigInt(5750950))
        return 92;
        if(checkExp>=BigInt(5575950))
        return 91;
        if(checkExp>=BigInt(5400950))
        return 90;
        if(checkExp>=BigInt(5225950))
        return 89;
        return 88;
        }
        if(checkExp<=BigInt(9225950))
        {
        if(checkExp>=BigInt(9225950))
        return 110;
        if(checkExp>=BigInt(8975950))
        return 109;
        if(checkExp>=BigInt(8775950))
        return 108;
        if(checkExp>=BigInt(8575950))
        return 107;
        if(checkExp>=BigInt(8375950))
        return 106;
        if(checkExp>=BigInt(8175950))
        return 105;
        if(checkExp>=BigInt(7975950))
        return 104;
        if(checkExp>=BigInt(7775950))
        return 103;
        if(checkExp>=BigInt(7575950))
        return 102;
        if(checkExp>=BigInt(7375950))
        return 101;
        if(checkExp>=BigInt(7175950))
        return 100;
        return 99;
        }
        if(checkExp<=BigInt(12075950))
        {
        if(checkExp>=BigInt(12075950))
        return 121;
        if(checkExp>=BigInt(11775950))
        return 120;
        if(checkExp>=BigInt(11475950))
        return 119;
        if(checkExp>=BigInt(11225950))
        return 118;
        if(checkExp>=BigInt(10975950))
        return 117;
        if(checkExp>=BigInt(10725950))
        return 116;
        if(checkExp>=BigInt(10475950))
        return 115;
        if(checkExp>=BigInt(10225950))
        return 114;
        if(checkExp>=BigInt(9975950))
        return 113;
        if(checkExp>=BigInt(9725950))
        return 112;
        if(checkExp>=BigInt(9475950))
        return 111;
        return 110;
        }
        if(checkExp<=BigInt(15525950))
        {
        if(checkExp>=BigInt(15525950))
        return 132;
        if(checkExp>=BigInt(15175950))
        return 131;
        if(checkExp>=BigInt(14825950))
        return 130;
        if(checkExp>=BigInt(14475950))
        return 129;
        if(checkExp>=BigInt(14175950))
        return 128;
        if(checkExp>=BigInt(13875950))
        return 127;
        if(checkExp>=BigInt(13575950))
        return 126;
        if(checkExp>=BigInt(13275950))
        return 125;
        if(checkExp>=BigInt(12975950))
        return 124;
        if(checkExp>=BigInt(12675950))
        return 123;
        if(checkExp>=BigInt(12375950))
        return 122;
        return 121;
        }
        if(checkExp<=BigInt(19575950))
        {
        if(checkExp>=BigInt(19575950))
        return 143;
        if(checkExp>=BigInt(19175950))
        return 142;
        if(checkExp>=BigInt(18775950))
        return 141;
        if(checkExp>=BigInt(18375950))
        return 140;
        if(checkExp>=BigInt(17975950))
        return 139;
        if(checkExp>=BigInt(17625950))
        return 138;
        if(checkExp>=BigInt(17275950))
        return 137;
        if(checkExp>=BigInt(16925950))
        return 136;
        if(checkExp>=BigInt(16575950))
        return 135;
        if(checkExp>=BigInt(16225950))
        return 134;
        if(checkExp>=BigInt(15875950))
        return 133;
        return 132;
        }
        if(checkExp<=BigInt(24225950))
        {
        if(checkExp>=BigInt(24225950))
        return 154;
        if(checkExp>=BigInt(23775950))
        return 153;
        if(checkExp>=BigInt(23325950))
        return 152;
        if(checkExp>=BigInt(22875950))
        return 151;
        if(checkExp>=BigInt(22425950))
        return 150;
        if(checkExp>=BigInt(21975950))
        return 149;
        if(checkExp>=BigInt(21575950))
        return 148;
        if(checkExp>=BigInt(21175950))
        return 147;
        if(checkExp>=BigInt(20775950))
        return 146;
        if(checkExp>=BigInt(20375950))
        return 145;
        if(checkExp>=BigInt(19975950))
        return 144;
        return 143;
        }
        if(checkExp<=BigInt(29475950))
        {
        if(checkExp>=BigInt(29475950))
        return 165;
        if(checkExp>=BigInt(28975950))
        return 164;
        if(checkExp>=BigInt(28475950))
        return 163;
        if(checkExp>=BigInt(27975950))
        return 162;
        if(checkExp>=BigInt(27475950))
        return 161;
        if(checkExp>=BigInt(26975950))
        return 160;
        if(checkExp>=BigInt(26475950))
        return 159;
        if(checkExp>=BigInt(26025950))
        return 158;
        if(checkExp>=BigInt(25575950))
        return 157;
        if(checkExp>=BigInt(25125950))
        return 156;
        if(checkExp>=BigInt(24675950))
        return 155;
        return 154;
        }
        if(checkExp<=BigInt(34975950))
        {
        if(checkExp>=BigInt(34975950))
        return 176;
        if(checkExp>=BigInt(34475950))
        return 175;
        if(checkExp>=BigInt(33975950))
        return 174;
        if(checkExp>=BigInt(33475950))
        return 173;
        if(checkExp>=BigInt(32975950))
        return 172;
        if(checkExp>=BigInt(32475950))
        return 171;
        if(checkExp>=BigInt(31975950))
        return 170;
        if(checkExp>=BigInt(31475950))
        return 169;
        if(checkExp>=BigInt(30975950))
        return 168;
        if(checkExp>=BigInt(30475950))
        return 167;
        if(checkExp>=BigInt(29975950))
        return 166;
        return 165;
        }
        if(checkExp<=BigInt(42075950))
        {
        if(checkExp>=BigInt(42075950))
        return 187;
        if(checkExp>=BigInt(41375950))
        return 186;
        if(checkExp>=BigInt(40675950))
        return 185;
        if(checkExp>=BigInt(39975950))
        return 184;
        if(checkExp>=BigInt(39275950))
        return 183;
        if(checkExp>=BigInt(38575950))
        return 182;
        if(checkExp>=BigInt(37875950))
        return 181;
        if(checkExp>=BigInt(37175950))
        return 180;
        if(checkExp>=BigInt(36475950))
        return 179;
        if(checkExp>=BigInt(35975950))
        return 178;
        if(checkExp>=BigInt(35475950))
        return 177;
        return 176;
        }
        if(checkExp<=BigInt(50675950))
        {
        if(checkExp>=BigInt(50675950))
        return 198;
        if(checkExp>=BigInt(49875950))
        return 197;
        if(checkExp>=BigInt(49075950))
        return 196;
        if(checkExp>=BigInt(48275950))
        return 195;
        if(checkExp>=BigInt(47475950))
        return 194;
        if(checkExp>=BigInt(46675950))
        return 193;
        if(checkExp>=BigInt(45875950))
        return 192;
        if(checkExp>=BigInt(45075950))
        return 191;
        if(checkExp>=BigInt(44275950))
        return 190;
        if(checkExp>=BigInt(43475950))
        return 189;
        if(checkExp>=BigInt(42775950))
        return 188;
        return 187;
        }
        if(checkExp<=BigInt(61475950))
        {
        if(checkExp>=BigInt(61475950))
        return 209;
        if(checkExp>=BigInt(60475950))
        return 208;
        if(checkExp>=BigInt(59475950))
        return 207;
        if(checkExp>=BigInt(58475950))
        return 206;
        if(checkExp>=BigInt(57475950))
        return 205;
        if(checkExp>=BigInt(56475950))
        return 204;
        if(checkExp>=BigInt(55475950))
        return 203;
        if(checkExp>=BigInt(54475950))
        return 202;
        if(checkExp>=BigInt(53475950))
        return 201;
        if(checkExp>=BigInt(52475950))
        return 200;
        if(checkExp>=BigInt(51475950))
        return 199;
        return 198;
        }
        if(checkExp<=BigInt(74975950))
        {
        if(checkExp>=BigInt(74975950))
        return 220;
        if(checkExp>=BigInt(73475950))
        return 219;
        if(checkExp>=BigInt(72275950))
        return 218;
        if(checkExp>=BigInt(71075950))
        return 217;
        if(checkExp>=BigInt(69875950))
        return 216;
        if(checkExp>=BigInt(68675950))
        return 215;
        if(checkExp>=BigInt(67475950))
        return 214;
        if(checkExp>=BigInt(66275950))
        return 213;
        if(checkExp>=BigInt(65075950))
        return 212;
        if(checkExp>=BigInt(63875950))
        return 211;
        if(checkExp>=BigInt(62675950))
        return 210;
        return 209;
        }
        if(checkExp<=BigInt(91475950))
        {
        if(checkExp>=BigInt(91475950))
        return 231;
        if(checkExp>=BigInt(89975950))
        return 230;
        if(checkExp>=BigInt(88475950))
        return 229;
        if(checkExp>=BigInt(86975950))
        return 228;
        if(checkExp>=BigInt(85475950))
        return 227;
        if(checkExp>=BigInt(83975950))
        return 226;
        if(checkExp>=BigInt(82475950))
        return 225;
        if(checkExp>=BigInt(80975950))
        return 224;
        if(checkExp>=BigInt(79475950))
        return 223;
        if(checkExp>=BigInt(77975950))
        return 222;
        if(checkExp>=BigInt(76475950))
        return 221;
        return 220;
        }
        if(checkExp<=BigInt(109475950))
        {
        if(checkExp>=BigInt(109475950))
        return 242;
        if(checkExp>=BigInt(107475950))
        return 241;
        if(checkExp>=BigInt(105475950))
        return 240;
        if(checkExp>=BigInt(103475950))
        return 239;
        if(checkExp>=BigInt(101975950))
        return 238;
        if(checkExp>=BigInt(100475950))
        return 237;
        if(checkExp>=BigInt(98975950))
        return 236;
        if(checkExp>=BigInt(97475950))
        return 235;
        if(checkExp>=BigInt(95975950))
        return 234;
        if(checkExp>=BigInt(94475950))
        return 233;
        if(checkExp>=BigInt(92975950))
        return 232;
        return 231;
        }
        if(checkExp<=BigInt(131475950))
        {
        if(checkExp>=BigInt(131475950))
        return 253;
        if(checkExp>=BigInt(129475950))
        return 252;
        if(checkExp>=BigInt(127475950))
        return 251;
        if(checkExp>=BigInt(125475950))
        return 250;
        if(checkExp>=BigInt(123475950))
        return 249;
        if(checkExp>=BigInt(121475950))
        return 248;
        if(checkExp>=BigInt(119475950))
        return 247;
        if(checkExp>=BigInt(117475950))
        return 246;
        if(checkExp>=BigInt(115475950))
        return 245;
        if(checkExp>=BigInt(113475950))
        return 244;
        if(checkExp>=BigInt(111475950))
        return 243;
        return 242;
        }
        if(checkExp<=BigInt(155975950))
        {
        if(checkExp>=BigInt(155975950))
        return 264;
        if(checkExp>=BigInt(153475950))
        return 263;
        if(checkExp>=BigInt(150975950))
        return 262;
        if(checkExp>=BigInt(148475950))
        return 261;
        if(checkExp>=BigInt(145975950))
        return 260;
        if(checkExp>=BigInt(143475950))
        return 259;
        if(checkExp>=BigInt(141475950))
        return 258;
        if(checkExp>=BigInt(139475950))
        return 257;
        if(checkExp>=BigInt(137475950))
        return 256;
        if(checkExp>=BigInt(135475950))
        return 255;
        if(checkExp>=BigInt(133475950))
        return 254;
        return 253;
        }
        if(checkExp<=BigInt(183475950))
        {
        if(checkExp>=BigInt(183475950))
        return 275;
        if(checkExp>=BigInt(180975950))
        return 274;
        if(checkExp>=BigInt(178475950))
        return 273;
        if(checkExp>=BigInt(175975950))
        return 272;
        if(checkExp>=BigInt(173475950))
        return 271;
        if(checkExp>=BigInt(170975950))
        return 270;
        if(checkExp>=BigInt(168475950))
        return 269;
        if(checkExp>=BigInt(165975950))
        return 268;
        if(checkExp>=BigInt(163475950))
        return 267;
        if(checkExp>=BigInt(160975950))
        return 266;
        if(checkExp>=BigInt(158475950))
        return 265;
        return 264;
        }
        if(checkExp<=BigInt(214475950))
        {
        if(checkExp>=BigInt(214475950))
        return 286;
        if(checkExp>=BigInt(211475950))
        return 285;
        if(checkExp>=BigInt(208475950))
        return 284;
        if(checkExp>=BigInt(205475950))
        return 283;
        if(checkExp>=BigInt(202475950))
        return 282;
        if(checkExp>=BigInt(199475950))
        return 281;
        if(checkExp>=BigInt(196475950))
        return 280;
        if(checkExp>=BigInt(193475950))
        return 279;
        if(checkExp>=BigInt(190975950))
        return 278;
        if(checkExp>=BigInt(188475950))
        return 277;
        if(checkExp>=BigInt(185975950))
        return 276;
        return 275;
        }
        if(checkExp<=BigInt(247475950))
        {
        if(checkExp>=BigInt(247475950))
        return 297;
        if(checkExp>=BigInt(244475950))
        return 296;
        if(checkExp>=BigInt(241475950))
        return 295;
        if(checkExp>=BigInt(238475950))
        return 294;
        if(checkExp>=BigInt(235475950))
        return 293;
        if(checkExp>=BigInt(232475950))
        return 292;
        if(checkExp>=BigInt(229475950))
        return 291;
        if(checkExp>=BigInt(226475950))
        return 290;
        if(checkExp>=BigInt(223475950))
        return 289;
        if(checkExp>=BigInt(220475950))
        return 288;
        if(checkExp>=BigInt(217475950))
        return 287;
        return 286;
        }
        if(checkExp<=BigInt(284975950))
        {
        if(checkExp>=BigInt(284975950))
        return 308;
        if(checkExp>=BigInt(281475950))
        return 307;
        if(checkExp>=BigInt(277975950))
        return 306;
        if(checkExp>=BigInt(274475950))
        return 305;
        if(checkExp>=BigInt(270975950))
        return 304;
        if(checkExp>=BigInt(267475950))
        return 303;
        if(checkExp>=BigInt(263975950))
        return 302;
        if(checkExp>=BigInt(260475950))
        return 301;
        if(checkExp>=BigInt(256975950))
        return 300;
        if(checkExp>=BigInt(253475950))
        return 299;
        if(checkExp>=BigInt(250475950))
        return 298;
        return 297;
        }
        if(checkExp<=BigInt(323475950))
        {
        if(checkExp>=BigInt(323475950))
        return 319;
        if(checkExp>=BigInt(319975950))
        return 318;
        if(checkExp>=BigInt(316475950))
        return 317;
        if(checkExp>=BigInt(312975950))
        return 316;
        if(checkExp>=BigInt(309475950))
        return 315;
        if(checkExp>=BigInt(305975950))
        return 314;
        if(checkExp>=BigInt(302475950))
        return 313;
        if(checkExp>=BigInt(298975950))
        return 312;
        if(checkExp>=BigInt(295475950))
        return 311;
        if(checkExp>=BigInt(291975950))
        return 310;
        if(checkExp>=BigInt(288475950))
        return 309;
        return 308;
        }
        if(checkExp<=BigInt(367475950))
        {
        if(checkExp>=BigInt(367475950))
        return 330;
        if(checkExp>=BigInt(363475950))
        return 329;
        if(checkExp>=BigInt(359475950))
        return 328;
        if(checkExp>=BigInt(355475950))
        return 327;
        if(checkExp>=BigInt(351475950))
        return 326;
        if(checkExp>=BigInt(347475950))
        return 325;
        if(checkExp>=BigInt(343475950))
        return 324;
        if(checkExp>=BigInt(339475950))
        return 323;
        if(checkExp>=BigInt(335475950))
        return 322;
        if(checkExp>=BigInt(331475950))
        return 321;
        if(checkExp>=BigInt(327475950))
        return 320;
        return 319;
        }
        if(checkExp<=BigInt(411475950))
        {
        if(checkExp>=BigInt(411475950))
        return 341;
        if(checkExp>=BigInt(407475950))
        return 340;
        if(checkExp>=BigInt(403475950))
        return 339;
        if(checkExp>=BigInt(399475950))
        return 338;
        if(checkExp>=BigInt(395475950))
        return 337;
        if(checkExp>=BigInt(391475950))
        return 336;
        if(checkExp>=BigInt(387475950))
        return 335;
        if(checkExp>=BigInt(383475950))
        return 334;
        if(checkExp>=BigInt(379475950))
        return 333;
        if(checkExp>=BigInt(375475950))
        return 332;
        if(checkExp>=BigInt(371475950))
        return 331;
        return 330;
        }
        if(checkExp<=BigInt(456975950))
        {
        if(checkExp>=BigInt(456975950))
        return 352;
        if(checkExp>=BigInt(452475950))
        return 351;
        if(checkExp>=BigInt(447975950))
        return 350;
        if(checkExp>=BigInt(443475950))
        return 349;
        if(checkExp>=BigInt(439475950))
        return 348;
        if(checkExp>=BigInt(435475950))
        return 347;
        if(checkExp>=BigInt(431475950))
        return 346;
        if(checkExp>=BigInt(427475950))
        return 345;
        if(checkExp>=BigInt(423475950))
        return 344;
        if(checkExp>=BigInt(419475950))
        return 343;
        if(checkExp>=BigInt(415475950))
        return 342;
        return 341;
        }
        if(checkExp<=BigInt(506475950))
        {
        if(checkExp>=BigInt(506475950))
        return 363;
        if(checkExp>=BigInt(501975950))
        return 362;
        if(checkExp>=BigInt(497475950))
        return 361;
        if(checkExp>=BigInt(492975950))
        return 360;
        if(checkExp>=BigInt(488475950))
        return 359;
        if(checkExp>=BigInt(483975950))
        return 358;
        if(checkExp>=BigInt(479475950))
        return 357;
        if(checkExp>=BigInt(474975950))
        return 356;
        if(checkExp>=BigInt(470475950))
        return 355;
        if(checkExp>=BigInt(465975950))
        return 354;
        if(checkExp>=BigInt(461475950))
        return 353;
        return 352;
        }
        if(checkExp<=BigInt(555975950))
        {
        if(checkExp>=BigInt(555975950))
        return 374;
        if(checkExp>=BigInt(551475950))
        return 373;
        if(checkExp>=BigInt(546975950))
        return 372;
        if(checkExp>=BigInt(542475950))
        return 371;
        if(checkExp>=BigInt(537975950))
        return 370;
        if(checkExp>=BigInt(533475950))
        return 369;
        if(checkExp>=BigInt(528975950))
        return 368;
        if(checkExp>=BigInt(524475950))
        return 367;
        if(checkExp>=BigInt(519975950))
        return 366;
        if(checkExp>=BigInt(515475950))
        return 365;
        if(checkExp>=BigInt(510975950))
        return 364;
        return 363;
        }
        if(checkExp<=BigInt(608475950))
        {
        if(checkExp>=BigInt(608475950))
        return 385;
        if(checkExp>=BigInt(603475950))
        return 384;
        if(checkExp>=BigInt(598475950))
        return 383;
        if(checkExp>=BigInt(593475950))
        return 382;
        if(checkExp>=BigInt(588475950))
        return 381;
        if(checkExp>=BigInt(583475950))
        return 380;
        if(checkExp>=BigInt(578475950))
        return 379;
        if(checkExp>=BigInt(573975950))
        return 378;
        if(checkExp>=BigInt(569475950))
        return 377;
        if(checkExp>=BigInt(564975950))
        return 376;
        if(checkExp>=BigInt(560475950))
        return 375;
        return 374;
        }
        if(checkExp<=BigInt(663475950))
        {
        if(checkExp>=BigInt(663475950))
        return 396;
        if(checkExp>=BigInt(658475950))
        return 395;
        if(checkExp>=BigInt(653475950))
        return 394;
        if(checkExp>=BigInt(648475950))
        return 393;
        if(checkExp>=BigInt(643475950))
        return 392;
        if(checkExp>=BigInt(638475950))
        return 391;
        if(checkExp>=BigInt(633475950))
        return 390;
        if(checkExp>=BigInt(628475950))
        return 389;
        if(checkExp>=BigInt(623475950))
        return 388;
        if(checkExp>=BigInt(618475950))
        return 387;
        if(checkExp>=BigInt(613475950))
        return 386;
        return 385;
        }
        if(checkExp<=BigInt(718475950))
        {
        if(checkExp>=BigInt(718475950))
        return 407;
        if(checkExp>=BigInt(713475950))
        return 406;
        if(checkExp>=BigInt(708475950))
        return 405;
        if(checkExp>=BigInt(703475950))
        return 404;
        if(checkExp>=BigInt(698475950))
        return 403;
        if(checkExp>=BigInt(693475950))
        return 402;
        if(checkExp>=BigInt(688475950))
        return 401;
        if(checkExp>=BigInt(683475950))
        return 400;
        if(checkExp>=BigInt(678475950))
        return 399;
        if(checkExp>=BigInt(673475950))
        return 398;
        if(checkExp>=BigInt(668475950))
        return 397;
        return 396;
        }
        if(checkExp<=BigInt(777975950))
        {
        if(checkExp>=BigInt(777975950))
        return 418;
        if(checkExp>=BigInt(772475950))
        return 417;
        if(checkExp>=BigInt(766975950))
        return 416;
        if(checkExp>=BigInt(761475950))
        return 415;
        if(checkExp>=BigInt(755975950))
        return 414;
        if(checkExp>=BigInt(750475950))
        return 413;
        if(checkExp>=BigInt(744975950))
        return 412;
        if(checkExp>=BigInt(739475950))
        return 411;
        if(checkExp>=BigInt(733975950))
        return 410;
        if(checkExp>=BigInt(728475950))
        return 409;
        if(checkExp>=BigInt(723475950))
        return 408;
        return 407;
        }
        if(checkExp<=BigInt(838475950))
        {
        if(checkExp>=BigInt(838475950))
        return 429;
        if(checkExp>=BigInt(832975950))
        return 428;
        if(checkExp>=BigInt(827475950))
        return 427;
        if(checkExp>=BigInt(821975950))
        return 426;
        if(checkExp>=BigInt(816475950))
        return 425;
        if(checkExp>=BigInt(810975950))
        return 424;
        if(checkExp>=BigInt(805475950))
        return 423;
        if(checkExp>=BigInt(799975950))
        return 422;
        if(checkExp>=BigInt(794475950))
        return 421;
        if(checkExp>=BigInt(788975950))
        return 420;
        if(checkExp>=BigInt(783475950))
        return 419;
        return 418;
        }
        if(checkExp<=BigInt(904475950))
        {
        if(checkExp>=BigInt(904475950))
        return 440;
        if(checkExp>=BigInt(898475950))
        return 439;
        if(checkExp>=BigInt(892475950))
        return 438;
        if(checkExp>=BigInt(886475950))
        return 437;
        if(checkExp>=BigInt(880475950))
        return 436;
        if(checkExp>=BigInt(874475950))
        return 435;
        if(checkExp>=BigInt(868475950))
        return 434;
        if(checkExp>=BigInt(862475950))
        return 433;
        if(checkExp>=BigInt(856475950))
        return 432;
        if(checkExp>=BigInt(850475950))
        return 431;
        if(checkExp>=BigInt(844475950))
        return 430;
        return 429;
        }
        if(checkExp<=BigInt(971475950))
        {
        if(checkExp>=BigInt(971475950))
        return 451;
        if(checkExp>=BigInt(964975950))
        return 450;
        if(checkExp>=BigInt(958475950))
        return 449;
        if(checkExp>=BigInt(952475950))
        return 448;
        if(checkExp>=BigInt(946475950))
        return 447;
        if(checkExp>=BigInt(940475950))
        return 446;
        if(checkExp>=BigInt(934475950))
        return 445;
        if(checkExp>=BigInt(928475950))
        return 444;
        if(checkExp>=BigInt(922475950))
        return 443;
        if(checkExp>=BigInt(916475950))
        return 442;
        if(checkExp>=BigInt(910475950))
        return 441;
        return 440;
        }
        if(checkExp<=BigInt(1042975950))
        {
        if(checkExp>=BigInt(1042975950))
        return 462;
        if(checkExp>=BigInt(1036475950))
        return 461;
        if(checkExp>=BigInt(1029975950))
        return 460;
        if(checkExp>=BigInt(1023475950))
        return 459;
        if(checkExp>=BigInt(1016975950))
        return 458;
        if(checkExp>=BigInt(1010475950))
        return 457;
        if(checkExp>=BigInt(1003975950))
        return 456;
        if(checkExp>=BigInt(997475950))
        return 455;
        if(checkExp>=BigInt(990975950))
        return 454;
        if(checkExp>=BigInt(984475950))
        return 453;
        if(checkExp>=BigInt(977975950))
        return 452;
        return 451;
        }
        if(checkExp<=BigInt(1116475950))
        {
        if(checkExp>=BigInt(1116475950))
        return 473;
        if(checkExp>=BigInt(1109475950))
        return 472;
        if(checkExp>=BigInt(1102475950))
        return 471;
        if(checkExp>=BigInt(1095475950))
        return 470;
        if(checkExp>=BigInt(1088475950))
        return 469;
        if(checkExp>=BigInt(1081975950))
        return 468;
        if(checkExp>=BigInt(1075475950))
        return 467;
        if(checkExp>=BigInt(1068975950))
        return 466;
        if(checkExp>=BigInt(1062475950))
        return 465;
        if(checkExp>=BigInt(1055975950))
        return 464;
        if(checkExp>=BigInt(1049475950))
        return 463;
        return 462;
        }
        if(checkExp<=BigInt(1193475950))
        {
        if(checkExp>=BigInt(1193475950))
        return 484;
        if(checkExp>=BigInt(1186475950))
        return 483;
        if(checkExp>=BigInt(1179475950))
        return 482;
        if(checkExp>=BigInt(1172475950))
        return 481;
        if(checkExp>=BigInt(1165475950))
        return 480;
        if(checkExp>=BigInt(1158475950))
        return 479;
        if(checkExp>=BigInt(1151475950))
        return 478;
        if(checkExp>=BigInt(1144475950))
        return 477;
        if(checkExp>=BigInt(1137475950))
        return 476;
        if(checkExp>=BigInt(1130475950))
        return 475;
        if(checkExp>=BigInt(1123475950))
        return 474;
        return 473;
        }
        if(checkExp<=BigInt(1270475950))
        {
        if(checkExp>=BigInt(1270475950))
        return 495;
        if(checkExp>=BigInt(1263475950))
        return 494;
        if(checkExp>=BigInt(1256475950))
        return 493;
        if(checkExp>=BigInt(1249475950))
        return 492;
        if(checkExp>=BigInt(1242475950))
        return 491;
        if(checkExp>=BigInt(1235475950))
        return 490;
        if(checkExp>=BigInt(1228475950))
        return 489;
        if(checkExp>=BigInt(1221475950))
        return 488;
        if(checkExp>=BigInt(1214475950))
        return 487;
        if(checkExp>=BigInt(1207475950))
        return 486;
        if(checkExp>=BigInt(1200475950))
        return 485;
        return 484;
        }
        if(checkExp<=BigInt(1354475950))
        {
        if(checkExp>=BigInt(1354475950))
        return 506;
        if(checkExp>=BigInt(1346475950))
        return 505;
        if(checkExp>=BigInt(1338475950))
        return 504;
        if(checkExp>=BigInt(1330475950))
        return 503;
        if(checkExp>=BigInt(1322475950))
        return 502;
        if(checkExp>=BigInt(1314475950))
        return 501;
        if(checkExp>=BigInt(1306475950))
        return 500;
        if(checkExp>=BigInt(1298475950))
        return 499;
        if(checkExp>=BigInt(1291475950))
        return 498;
        if(checkExp>=BigInt(1284475950))
        return 497;
        if(checkExp>=BigInt(1277475950))
        return 496;
        return 495;
        }
        if(checkExp<=BigInt(1442475950))
        {
        if(checkExp>=BigInt(1442475950))
        return 517;
        if(checkExp>=BigInt(1434475950))
        return 516;
        if(checkExp>=BigInt(1426475950))
        return 515;
        if(checkExp>=BigInt(1418475950))
        return 514;
        if(checkExp>=BigInt(1410475950))
        return 513;
        if(checkExp>=BigInt(1402475950))
        return 512;
        if(checkExp>=BigInt(1394475950))
        return 511;
        if(checkExp>=BigInt(1386475950))
        return 510;
        if(checkExp>=BigInt(1378475950))
        return 509;
        if(checkExp>=BigInt(1370475950))
        return 508;
        if(checkExp>=BigInt(1362475950))
        return 507;
        return 506;
        }
        if(checkExp<=BigInt(1530475950))
        {
        if(checkExp>=BigInt(1530475950))
        return 528;
        if(checkExp>=BigInt(1522475950))
        return 527;
        if(checkExp>=BigInt(1514475950))
        return 526;
        if(checkExp>=BigInt(1506475950))
        return 525;
        if(checkExp>=BigInt(1498475950))
        return 524;
        if(checkExp>=BigInt(1490475950))
        return 523;
        if(checkExp>=BigInt(1482475950))
        return 522;
        if(checkExp>=BigInt(1474475950))
        return 521;
        if(checkExp>=BigInt(1466475950))
        return 520;
        if(checkExp>=BigInt(1458475950))
        return 519;
        if(checkExp>=BigInt(1450475950))
        return 518;
        return 517;
        }
        if(checkExp<=BigInt(1628475950))
        {
        if(checkExp>=BigInt(1628475950))
        return 539;
        if(checkExp>=BigInt(1619475950))
        return 538;
        if(checkExp>=BigInt(1610475950))
        return 537;
        if(checkExp>=BigInt(1601475950))
        return 536;
        if(checkExp>=BigInt(1592475950))
        return 535;
        if(checkExp>=BigInt(1583475950))
        return 534;
        if(checkExp>=BigInt(1574475950))
        return 533;
        if(checkExp>=BigInt(1565475950))
        return 532;
        if(checkExp>=BigInt(1556475950))
        return 531;
        if(checkExp>=BigInt(1547475950))
        return 530;
        if(checkExp>=BigInt(1538475950))
        return 529;
        return 528;
        }
        if(checkExp<=BigInt(1727475950))
        {
        if(checkExp>=BigInt(1727475950))
        return 550;
        if(checkExp>=BigInt(1718475950))
        return 549;
        if(checkExp>=BigInt(1709475950))
        return 548;
        if(checkExp>=BigInt(1700475950))
        return 547;
        if(checkExp>=BigInt(1691475950))
        return 546;
        if(checkExp>=BigInt(1682475950))
        return 545;
        if(checkExp>=BigInt(1673475950))
        return 544;
        if(checkExp>=BigInt(1664475950))
        return 543;
        if(checkExp>=BigInt(1655475950))
        return 542;
        if(checkExp>=BigInt(1646475950))
        return 541;
        if(checkExp>=BigInt(1637475950))
        return 540;
        return 539;
        }
        if(checkExp<=BigInt(1828475950))
        {
        if(checkExp>=BigInt(1828475950))
        return 561;
        if(checkExp>=BigInt(1818475950))
        return 560;
        if(checkExp>=BigInt(1808475950))
        return 559;
        if(checkExp>=BigInt(1799475950))
        return 558;
        if(checkExp>=BigInt(1790475950))
        return 557;
        if(checkExp>=BigInt(1781475950))
        return 556;
        if(checkExp>=BigInt(1772475950))
        return 555;
        if(checkExp>=BigInt(1763475950))
        return 554;
        if(checkExp>=BigInt(1754475950))
        return 553;
        if(checkExp>=BigInt(1745475950))
        return 552;
        if(checkExp>=BigInt(1736475950))
        return 551;
        return 550;
        }
        if(checkExp<=BigInt(1938475950))
        {
        if(checkExp>=BigInt(1938475950))
        return 572;
        if(checkExp>=BigInt(1928475950))
        return 571;
        if(checkExp>=BigInt(1918475950))
        return 570;
        if(checkExp>=BigInt(1908475950))
        return 569;
        if(checkExp>=BigInt(1898475950))
        return 568;
        if(checkExp>=BigInt(1888475950))
        return 567;
        if(checkExp>=BigInt(1878475950))
        return 566;
        if(checkExp>=BigInt(1868475950))
        return 565;
        if(checkExp>=BigInt(1858475950))
        return 564;
        if(checkExp>=BigInt(1848475950))
        return 563;
        if(checkExp>=BigInt(1838475950))
        return 562;
        return 561;
        }
        if(checkExp<=BigInt(2048475950))
        {
        if(checkExp>=BigInt(2048475950))
        return 583;
        if(checkExp>=BigInt(2038475950))
        return 582;
        if(checkExp>=BigInt(2028475950))
        return 581;
        if(checkExp>=BigInt(2018475950))
        return 580;
        if(checkExp>=BigInt(2008475950))
        return 579;
        if(checkExp>=BigInt(1998475950))
        return 578;
        if(checkExp>=BigInt(1988475950))
        return 577;
        if(checkExp>=BigInt(1978475950))
        return 576;
        if(checkExp>=BigInt(1968475950))
        return 575;
        if(checkExp>=BigInt(1958475950))
        return 574;
        if(checkExp>=BigInt(1948475950))
        return 573;
        return 572;
        }
        if(checkExp<=BigInt(2158475950))
        {
        if(checkExp>=BigInt(2158475950))
        return 594;
        if(checkExp>=BigInt(2148475950))
        return 593;
        if(checkExp>=BigInt(2138475950))
        return 592;
        if(checkExp>=BigInt(2128475950))
        return 591;
        if(checkExp>=BigInt(2118475950))
        return 590;
        if(checkExp>=BigInt(2108475950))
        return 589;
        if(checkExp>=BigInt(2098475950))
        return 588;
        if(checkExp>=BigInt(2088475950))
        return 587;
        if(checkExp>=BigInt(2078475950))
        return 586;
        if(checkExp>=BigInt(2068475950))
        return 585;
        if(checkExp>=BigInt(2058475950))
        return 584;
        return 583;
        }
        if(checkExp<=BigInt(2275475950))
        {
        if(checkExp>=BigInt(2275475950))
        return 605;
        if(checkExp>=BigInt(2264475950))
        return 604;
        if(checkExp>=BigInt(2253475950))
        return 603;
        if(checkExp>=BigInt(2242475950))
        return 602;
        if(checkExp>=BigInt(2231475950))
        return 601;
        if(checkExp>=BigInt(2220475950))
        return 600;
        if(checkExp>=BigInt(2209475950))
        return 599;
        if(checkExp>=BigInt(2198475950))
        return 598;
        if(checkExp>=BigInt(2188475950))
        return 597;
        if(checkExp>=BigInt(2178475950))
        return 596;
        if(checkExp>=BigInt(2168475950))
        return 595;
        return 594;
        }
        if(checkExp<=BigInt(2396475950))
        {
        if(checkExp>=BigInt(2396475950))
        return 616;
        if(checkExp>=BigInt(2385475950))
        return 615;
        if(checkExp>=BigInt(2374475950))
        return 614;
        if(checkExp>=BigInt(2363475950))
        return 613;
        if(checkExp>=BigInt(2352475950))
        return 612;
        if(checkExp>=BigInt(2341475950))
        return 611;
        if(checkExp>=BigInt(2330475950))
        return 610;
        if(checkExp>=BigInt(2319475950))
        return 609;
        if(checkExp>=BigInt(2308475950))
        return 608;
        if(checkExp>=BigInt(2297475950))
        return 607;
        if(checkExp>=BigInt(2286475950))
        return 606;
        return 605;
        }
        if(checkExp<=BigInt(2525475950))
        {
        if(checkExp>=BigInt(2525475950))
        return 627;
        if(checkExp>=BigInt(2513475950))
        return 626;
        if(checkExp>=BigInt(2501475950))
        return 625;
        if(checkExp>=BigInt(2489475950))
        return 624;
        if(checkExp>=BigInt(2477475950))
        return 623;
        if(checkExp>=BigInt(2465475950))
        return 622;
        if(checkExp>=BigInt(2453475950))
        return 621;
        if(checkExp>=BigInt(2441475950))
        return 620;
        if(checkExp>=BigInt(2429475950))
        return 619;
        if(checkExp>=BigInt(2418475950))
        return 618;
        if(checkExp>=BigInt(2407475950))
        return 617;
        return 616;
        }
        if(checkExp<=BigInt(2657475950))
        {
        if(checkExp>=BigInt(2657475950))
        return 638;
        if(checkExp>=BigInt(2645475950))
        return 637;
        if(checkExp>=BigInt(2633475950))
        return 636;
        if(checkExp>=BigInt(2621475950))
        return 635;
        if(checkExp>=BigInt(2609475950))
        return 634;
        if(checkExp>=BigInt(2597475950))
        return 633;
        if(checkExp>=BigInt(2585475950))
        return 632;
        if(checkExp>=BigInt(2573475950))
        return 631;
        if(checkExp>=BigInt(2561475950))
        return 630;
        if(checkExp>=BigInt(2549475950))
        return 629;
        if(checkExp>=BigInt(2537475950))
        return 628;
        return 627;
        }
        if(checkExp<=BigInt(2799475950))
        {
        if(checkExp>=BigInt(2799475950))
        return 649;
        if(checkExp>=BigInt(2786475950))
        return 648;
        if(checkExp>=BigInt(2773475950))
        return 647;
        if(checkExp>=BigInt(2760475950))
        return 646;
        if(checkExp>=BigInt(2747475950))
        return 645;
        if(checkExp>=BigInt(2734475950))
        return 644;
        if(checkExp>=BigInt(2721475950))
        return 643;
        if(checkExp>=BigInt(2708475950))
        return 642;
        if(checkExp>=BigInt(2695475950))
        return 641;
        if(checkExp>=BigInt(2682475950))
        return 640;
        if(checkExp>=BigInt(2669475950))
        return 639;
        return 638;
        }
        if(checkExp<=BigInt(2943475950))
        {
        if(checkExp>=BigInt(2943475950))
        return 660;
        if(checkExp>=BigInt(2929475950))
        return 659;
        if(checkExp>=BigInt(2916475950))
        return 658;
        if(checkExp>=BigInt(2903475950))
        return 657;
        if(checkExp>=BigInt(2890475950))
        return 656;
        if(checkExp>=BigInt(2877475950))
        return 655;
        if(checkExp>=BigInt(2864475950))
        return 654;
        if(checkExp>=BigInt(2851475950))
        return 653;
        if(checkExp>=BigInt(2838475950))
        return 652;
        if(checkExp>=BigInt(2825475950))
        return 651;
        if(checkExp>=BigInt(2812475950))
        return 650;
        return 649;
        }
        if(checkExp<=BigInt(3097475950))
        {
        if(checkExp>=BigInt(3097475950))
        return 671;
        if(checkExp>=BigInt(3083475950))
        return 670;
        if(checkExp>=BigInt(3069475950))
        return 669;
        if(checkExp>=BigInt(3055475950))
        return 668;
        if(checkExp>=BigInt(3041475950))
        return 667;
        if(checkExp>=BigInt(3027475950))
        return 666;
        if(checkExp>=BigInt(3013475950))
        return 665;
        if(checkExp>=BigInt(2999475950))
        return 664;
        if(checkExp>=BigInt(2985475950))
        return 663;
        if(checkExp>=BigInt(2971475950))
        return 662;
        if(checkExp>=BigInt(2957475950))
        return 661;
        return 660;
        }
        if(checkExp<=BigInt(3254475950))
        {
        if(checkExp>=BigInt(3254475950))
        return 682;
        if(checkExp>=BigInt(3239475950))
        return 681;
        if(checkExp>=BigInt(3224475950))
        return 680;
        if(checkExp>=BigInt(3209475950))
        return 679;
        if(checkExp>=BigInt(3195475950))
        return 678;
        if(checkExp>=BigInt(3181475950))
        return 677;
        if(checkExp>=BigInt(3167475950))
        return 676;
        if(checkExp>=BigInt(3153475950))
        return 675;
        if(checkExp>=BigInt(3139475950))
        return 674;
        if(checkExp>=BigInt(3125475950))
        return 673;
        if(checkExp>=BigInt(3111475950))
        return 672;
        return 671;
        }
        if(checkExp<=BigInt(3419475950))
        {
        if(checkExp>=BigInt(3419475950))
        return 693;
        if(checkExp>=BigInt(3404475950))
        return 692;
        if(checkExp>=BigInt(3389475950))
        return 691;
        if(checkExp>=BigInt(3374475950))
        return 690;
        if(checkExp>=BigInt(3359475950))
        return 689;
        if(checkExp>=BigInt(3344475950))
        return 688;
        if(checkExp>=BigInt(3329475950))
        return 687;
        if(checkExp>=BigInt(3314475950))
        return 686;
        if(checkExp>=BigInt(3299475950))
        return 685;
        if(checkExp>=BigInt(3284475950))
        return 684;
        if(checkExp>=BigInt(3269475950))
        return 683;
        return 682;
        }
        if(checkExp<=BigInt(3609475950))
        {
        if(checkExp>=BigInt(3609475950))
        return 704;
        if(checkExp>=BigInt(3589475950))
        return 703;
        if(checkExp>=BigInt(3569475950))
        return 702;
        if(checkExp>=BigInt(3549475950))
        return 701;
        if(checkExp>=BigInt(3529475950))
        return 700;
        if(checkExp>=BigInt(3509475950))
        return 699;
        if(checkExp>=BigInt(3494475950))
        return 698;
        if(checkExp>=BigInt(3479475950))
        return 697;
        if(checkExp>=BigInt(3464475950))
        return 696;
        if(checkExp>=BigInt(3449475950))
        return 695;
        if(checkExp>=BigInt(3434475950))
        return 694;
        return 693;
        }
        if(checkExp<=BigInt(3829475950))
        {
        if(checkExp>=BigInt(3829475950))
        return 715;
        if(checkExp>=BigInt(3809475950))
        return 714;
        if(checkExp>=BigInt(3789475950))
        return 713;
        if(checkExp>=BigInt(3769475950))
        return 712;
        if(checkExp>=BigInt(3749475950))
        return 711;
        if(checkExp>=BigInt(3729475950))
        return 710;
        if(checkExp>=BigInt(3709475950))
        return 709;
        if(checkExp>=BigInt(3689475950))
        return 708;
        if(checkExp>=BigInt(3669475950))
        return 707;
        if(checkExp>=BigInt(3649475950))
        return 706;
        if(checkExp>=BigInt(3629475950))
        return 705;
        return 704;
        }
        if(checkExp<=BigInt(4063475950))
        {
        if(checkExp>=BigInt(4063475950))
        return 726;
        if(checkExp>=BigInt(4041475950))
        return 725;
        if(checkExp>=BigInt(4019475950))
        return 724;
        if(checkExp>=BigInt(3997475950))
        return 723;
        if(checkExp>=BigInt(3975475950))
        return 722;
        if(checkExp>=BigInt(3953475950))
        return 721;
        if(checkExp>=BigInt(3931475950))
        return 720;
        if(checkExp>=BigInt(3909475950))
        return 719;
        if(checkExp>=BigInt(3889475950))
        return 718;
        if(checkExp>=BigInt(3869475950))
        return 717;
        if(checkExp>=BigInt(3849475950))
        return 716;
        return 715;
        }
        if(checkExp<=BigInt(4305475950))
        {
        if(checkExp>=BigInt(4305475950))
        return 737;
        if(checkExp>=BigInt(4283475950))
        return 736;
        if(checkExp>=BigInt(4261475950))
        return 735;
        if(checkExp>=BigInt(4239475950))
        return 734;
        if(checkExp>=BigInt(4217475950))
        return 733;
        if(checkExp>=BigInt(4195475950))
        return 732;
        if(checkExp>=BigInt(4173475950))
        return 731;
        if(checkExp>=BigInt(4151475950))
        return 730;
        if(checkExp>=BigInt(4129475950))
        return 729;
        if(checkExp>=BigInt(4107475950))
        return 728;
        if(checkExp>=BigInt(4085475950))
        return 727;
        return 726;
        }
        if(checkExp<=BigInt(4574475950))
        {
        if(checkExp>=BigInt(4574475950))
        return 748;
        if(checkExp>=BigInt(4549475950))
        return 747;
        if(checkExp>=BigInt(4524475950))
        return 746;
        if(checkExp>=BigInt(4499475950))
        return 745;
        if(checkExp>=BigInt(4474475950))
        return 744;
        if(checkExp>=BigInt(4449475950))
        return 743;
        if(checkExp>=BigInt(4424475950))
        return 742;
        if(checkExp>=BigInt(4399475950))
        return 741;
        if(checkExp>=BigInt(4374475950))
        return 740;
        if(checkExp>=BigInt(4349475950))
        return 739;
        if(checkExp>=BigInt(4327475950))
        return 738;
        return 737;
        }
        if(checkExp<=BigInt(4849475950))
        {
        if(checkExp>=BigInt(4849475950))
        return 759;
        if(checkExp>=BigInt(4824475950))
        return 758;
        if(checkExp>=BigInt(4799475950))
        return 757;
        if(checkExp>=BigInt(4774475950))
        return 756;
        if(checkExp>=BigInt(4749475950))
        return 755;
        if(checkExp>=BigInt(4724475950))
        return 754;
        if(checkExp>=BigInt(4699475950))
        return 753;
        if(checkExp>=BigInt(4674475950))
        return 752;
        if(checkExp>=BigInt(4649475950))
        return 751;
        if(checkExp>=BigInt(4624475950))
        return 750;
        if(checkExp>=BigInt(4599475950))
        return 749;
        return 748;
        }
        if(checkExp<=BigInt(5179475950))
        {
        if(checkExp>=BigInt(5179475950))
        return 770;
        if(checkExp>=BigInt(5149475950))
        return 769;
        if(checkExp>=BigInt(5119475950))
        return 768;
        if(checkExp>=BigInt(5089475950))
        return 767;
        if(checkExp>=BigInt(5059475950))
        return 766;
        if(checkExp>=BigInt(5029475950))
        return 765;
        if(checkExp>=BigInt(4999475950))
        return 764;
        if(checkExp>=BigInt(4969475950))
        return 763;
        if(checkExp>=BigInt(4939475950))
        return 762;
        if(checkExp>=BigInt(4909475950))
        return 761;
        if(checkExp>=BigInt(4879475950))
        return 760;
        return 759;
        }
        if(checkExp<=BigInt(5519475950))
        {
        if(checkExp>=BigInt(5519475950))
        return 781;
        if(checkExp>=BigInt(5484475950))
        return 780;
        if(checkExp>=BigInt(5449475950))
        return 779;
        if(checkExp>=BigInt(5419475950))
        return 778;
        if(checkExp>=BigInt(5389475950))
        return 777;
        if(checkExp>=BigInt(5359475950))
        return 776;
        if(checkExp>=BigInt(5329475950))
        return 775;
        if(checkExp>=BigInt(5299475950))
        return 774;
        if(checkExp>=BigInt(5269475950))
        return 773;
        if(checkExp>=BigInt(5239475950))
        return 772;
        if(checkExp>=BigInt(5209475950))
        return 771;
        return 770;
        }
        if(checkExp<=BigInt(5904475950))
        {
        if(checkExp>=BigInt(5904475950))
        return 792;
        if(checkExp>=BigInt(5869475950))
        return 791;
        if(checkExp>=BigInt(5834475950))
        return 790;
        if(checkExp>=BigInt(5799475950))
        return 789;
        if(checkExp>=BigInt(5764475950))
        return 788;
        if(checkExp>=BigInt(5729475950))
        return 787;
        if(checkExp>=BigInt(5694475950))
        return 786;
        if(checkExp>=BigInt(5659475950))
        return 785;
        if(checkExp>=BigInt(5624475950))
        return 784;
        if(checkExp>=BigInt(5589475950))
        return 783;
        if(checkExp>=BigInt(5554475950))
        return 782;
        return 781;
        }
        if(checkExp<=BigInt(6309475950))
        {
        if(checkExp>=BigInt(6309475950))
        return 803;
        if(checkExp>=BigInt(6269475950))
        return 802;
        if(checkExp>=BigInt(6229475950))
        return 801;
        if(checkExp>=BigInt(6189475950))
        return 800;
        if(checkExp>=BigInt(6149475950))
        return 799;
        if(checkExp>=BigInt(6114475950))
        return 798;
        if(checkExp>=BigInt(6079475950))
        return 797;
        if(checkExp>=BigInt(6044475950))
        return 796;
        if(checkExp>=BigInt(6009475950))
        return 795;
        if(checkExp>=BigInt(5974475950))
        return 794;
        if(checkExp>=BigInt(5939475950))
        return 793;
        return 792;
        }
        if(checkExp<=BigInt(6749475950))
        {
        if(checkExp>=BigInt(6749475950))
        return 814;
        if(checkExp>=BigInt(6709475950))
        return 813;
        if(checkExp>=BigInt(6669475950))
        return 812;
        if(checkExp>=BigInt(6629475950))
        return 811;
        if(checkExp>=BigInt(6589475950))
        return 810;
        if(checkExp>=BigInt(6549475950))
        return 809;
        if(checkExp>=BigInt(6509475950))
        return 808;
        if(checkExp>=BigInt(6469475950))
        return 807;
        if(checkExp>=BigInt(6429475950))
        return 806;
        if(checkExp>=BigInt(6389475950))
        return 805;
        if(checkExp>=BigInt(6349475950))
        return 804;
        return 803;
        }
        if(checkExp<=BigInt(7189475950))
        {
        if(checkExp>=BigInt(7189475950))
        return 825;
        if(checkExp>=BigInt(7149475950))
        return 824;
        if(checkExp>=BigInt(7109475950))
        return 823;
        if(checkExp>=BigInt(7069475950))
        return 822;
        if(checkExp>=BigInt(7029475950))
        return 821;
        if(checkExp>=BigInt(6989475950))
        return 820;
        if(checkExp>=BigInt(6949475950))
        return 819;
        if(checkExp>=BigInt(6909475950))
        return 818;
        if(checkExp>=BigInt(6869475950))
        return 817;
        if(checkExp>=BigInt(6829475950))
        return 816;
        if(checkExp>=BigInt(6789475950))
        return 815;
        return 814;
        }
        if(checkExp<=BigInt(7629475950))
        {
        if(checkExp>=BigInt(7629475950))
        return 836;
        if(checkExp>=BigInt(7589475950))
        return 835;
        if(checkExp>=BigInt(7549475950))
        return 834;
        if(checkExp>=BigInt(7509475950))
        return 833;
        if(checkExp>=BigInt(7469475950))
        return 832;
        if(checkExp>=BigInt(7429475950))
        return 831;
        if(checkExp>=BigInt(7389475950))
        return 830;
        if(checkExp>=BigInt(7349475950))
        return 829;
        if(checkExp>=BigInt(7309475950))
        return 828;
        if(checkExp>=BigInt(7269475950))
        return 827;
        if(checkExp>=BigInt(7229475950))
        return 826;
        return 825;
        }
        if(checkExp<=BigInt(8069475950))
        {
        if(checkExp>=BigInt(8069475950))
        return 847;
        if(checkExp>=BigInt(8029475950))
        return 846;
        if(checkExp>=BigInt(7989475950))
        return 845;
        if(checkExp>=BigInt(7949475950))
        return 844;
        if(checkExp>=BigInt(7909475950))
        return 843;
        if(checkExp>=BigInt(7869475950))
        return 842;
        if(checkExp>=BigInt(7829475950))
        return 841;
        if(checkExp>=BigInt(7789475950))
        return 840;
        if(checkExp>=BigInt(7749475950))
        return 839;
        if(checkExp>=BigInt(7709475950))
        return 838;
        if(checkExp>=BigInt(7669475950))
        return 837;
        return 836;
        }
        if(checkExp<=BigInt(8554475950))
        {
        if(checkExp>=BigInt(8554475950))
        return 858;
        if(checkExp>=BigInt(8509475950))
        return 857;
        if(checkExp>=BigInt(8464475950))
        return 856;
        if(checkExp>=BigInt(8419475950))
        return 855;
        if(checkExp>=BigInt(8374475950))
        return 854;
        if(checkExp>=BigInt(8329475950))
        return 853;
        if(checkExp>=BigInt(8284475950))
        return 852;
        if(checkExp>=BigInt(8239475950))
        return 851;
        if(checkExp>=BigInt(8194475950))
        return 850;
        if(checkExp>=BigInt(8149475950))
        return 849;
        if(checkExp>=BigInt(8109475950))
        return 848;
        return 847;
        }
        if(checkExp<=BigInt(9049475950))
        {
        if(checkExp>=BigInt(9049475950))
        return 869;
        if(checkExp>=BigInt(9004475950))
        return 868;
        if(checkExp>=BigInt(8959475950))
        return 867;
        if(checkExp>=BigInt(8914475950))
        return 866;
        if(checkExp>=BigInt(8869475950))
        return 865;
        if(checkExp>=BigInt(8824475950))
        return 864;
        if(checkExp>=BigInt(8779475950))
        return 863;
        if(checkExp>=BigInt(8734475950))
        return 862;
        if(checkExp>=BigInt(8689475950))
        return 861;
        if(checkExp>=BigInt(8644475950))
        return 860;
        if(checkExp>=BigInt(8599475950))
        return 859;
        return 858;
        }
        if(checkExp<=BigInt(9544475950))
        {
        if(checkExp>=BigInt(9544475950))
        return 880;
        if(checkExp>=BigInt(9499475950))
        return 879;
        if(checkExp>=BigInt(9454475950))
        return 878;
        if(checkExp>=BigInt(9409475950))
        return 877;
        if(checkExp>=BigInt(9364475950))
        return 876;
        if(checkExp>=BigInt(9319475950))
        return 875;
        if(checkExp>=BigInt(9274475950))
        return 874;
        if(checkExp>=BigInt(9229475950))
        return 873;
        if(checkExp>=BigInt(9184475950))
        return 872;
        if(checkExp>=BigInt(9139475950))
        return 871;
        if(checkExp>=BigInt(9094475950))
        return 870;
        return 869;
        }
        if(checkExp<=BigInt(10039475950))
        {
        if(checkExp>=BigInt(10039475950))
        return 891;
        if(checkExp>=BigInt(9994475950))
        return 890;
        if(checkExp>=BigInt(9949475950))
        return 889;
        if(checkExp>=BigInt(9904475950))
        return 888;
        if(checkExp>=BigInt(9859475950))
        return 887;
        if(checkExp>=BigInt(9814475950))
        return 886;
        if(checkExp>=BigInt(9769475950))
        return 885;
        if(checkExp>=BigInt(9724475950))
        return 884;
        if(checkExp>=BigInt(9679475950))
        return 883;
        if(checkExp>=BigInt(9634475950))
        return 882;
        if(checkExp>=BigInt(9589475950))
        return 881;
        return 880;
        }
        if(checkExp<=BigInt(10549475950))
        {
        if(checkExp>=BigInt(10549475950))
        return 902;
        if(checkExp>=BigInt(10499475950))
        return 901;
        if(checkExp>=BigInt(10449475950))
        return 900;
        if(checkExp>=BigInt(10399475950))
        return 899;
        if(checkExp>=BigInt(10354475950))
        return 898;
        if(checkExp>=BigInt(10309475950))
        return 897;
        if(checkExp>=BigInt(10264475950))
        return 896;
        if(checkExp>=BigInt(10219475950))
        return 895;
        if(checkExp>=BigInt(10174475950))
        return 894;
        if(checkExp>=BigInt(10129475950))
        return 893;
        if(checkExp>=BigInt(10084475950))
        return 892;
        return 891;
        }
        if(checkExp<=BigInt(11099475950))
        {
        if(checkExp>=BigInt(11099475950))
        return 913;
        if(checkExp>=BigInt(11049475950))
        return 912;
        if(checkExp>=BigInt(10999475950))
        return 911;
        if(checkExp>=BigInt(10949475950))
        return 910;
        if(checkExp>=BigInt(10899475950))
        return 909;
        if(checkExp>=BigInt(10849475950))
        return 908;
        if(checkExp>=BigInt(10799475950))
        return 907;
        if(checkExp>=BigInt(10749475950))
        return 906;
        if(checkExp>=BigInt(10699475950))
        return 905;
        if(checkExp>=BigInt(10649475950))
        return 904;
        if(checkExp>=BigInt(10599475950))
        return 903;
        return 902;
        }
        if(checkExp<=BigInt(11649475950))
        {
        if(checkExp>=BigInt(11649475950))
        return 924;
        if(checkExp>=BigInt(11599475950))
        return 923;
        if(checkExp>=BigInt(11549475950))
        return 922;
        if(checkExp>=BigInt(11499475950))
        return 921;
        if(checkExp>=BigInt(11449475950))
        return 920;
        if(checkExp>=BigInt(11399475950))
        return 919;
        if(checkExp>=BigInt(11349475950))
        return 918;
        if(checkExp>=BigInt(11299475950))
        return 917;
        if(checkExp>=BigInt(11249475950))
        return 916;
        if(checkExp>=BigInt(11199475950))
        return 915;
        if(checkExp>=BigInt(11149475950))
        return 914;
        return 913;
        }
        if(checkExp<=BigInt(12199475950))
        {
        if(checkExp>=BigInt(12199475950))
        return 935;
        if(checkExp>=BigInt(12149475950))
        return 934;
        if(checkExp>=BigInt(12099475950))
        return 933;
        if(checkExp>=BigInt(12049475950))
        return 932;
        if(checkExp>=BigInt(11999475950))
        return 931;
        if(checkExp>=BigInt(11949475950))
        return 930;
        if(checkExp>=BigInt(11899475950))
        return 929;
        if(checkExp>=BigInt(11849475950))
        return 928;
        if(checkExp>=BigInt(11799475950))
        return 927;
        if(checkExp>=BigInt(11749475950))
        return 926;
        if(checkExp>=BigInt(11699475950))
        return 925;
        return 924;
        }
        if(checkExp<=BigInt(12749475950))
        {
        if(checkExp>=BigInt(12749475950))
        return 946;
        if(checkExp>=BigInt(12699475950))
        return 945;
        if(checkExp>=BigInt(12649475950))
        return 944;
        if(checkExp>=BigInt(12599475950))
        return 943;
        if(checkExp>=BigInt(12549475950))
        return 942;
        if(checkExp>=BigInt(12499475950))
        return 941;
        if(checkExp>=BigInt(12449475950))
        return 940;
        if(checkExp>=BigInt(12399475950))
        return 939;
        if(checkExp>=BigInt(12349475950))
        return 938;
        if(checkExp>=BigInt(12299475950))
        return 937;
        if(checkExp>=BigInt(12249475950))
        return 936;
        return 935;
        }
        if(checkExp<=BigInt(13379475950))
        {
        if(checkExp>=BigInt(13379475950))
        return 957;
        if(checkExp>=BigInt(13319475950))
        return 956;
        if(checkExp>=BigInt(13259475950))
        return 955;
        if(checkExp>=BigInt(13199475950))
        return 954;
        if(checkExp>=BigInt(13139475950))
        return 953;
        if(checkExp>=BigInt(13079475950))
        return 952;
        if(checkExp>=BigInt(13019475950))
        return 951;
        if(checkExp>=BigInt(12959475950))
        return 950;
        if(checkExp>=BigInt(12899475950))
        return 949;
        if(checkExp>=BigInt(12849475950))
        return 948;
        if(checkExp>=BigInt(12799475950))
        return 947;
        return 946;
        }
        if(checkExp<=BigInt(14039475950))
        {
        if(checkExp>=BigInt(14039475950))
        return 968;
        if(checkExp>=BigInt(13979475950))
        return 967;
        if(checkExp>=BigInt(13919475950))
        return 966;
        if(checkExp>=BigInt(13859475950))
        return 965;
        if(checkExp>=BigInt(13799475950))
        return 964;
        if(checkExp>=BigInt(13739475950))
        return 963;
        if(checkExp>=BigInt(13679475950))
        return 962;
        if(checkExp>=BigInt(13619475950))
        return 961;
        if(checkExp>=BigInt(13559475950))
        return 960;
        if(checkExp>=BigInt(13499475950))
        return 959;
        if(checkExp>=BigInt(13439475950))
        return 958;
        return 957;
        }
        if(checkExp<=BigInt(14699475950))
        {
        if(checkExp>=BigInt(14699475950))
        return 979;
        if(checkExp>=BigInt(14639475950))
        return 978;
        if(checkExp>=BigInt(14579475950))
        return 977;
        if(checkExp>=BigInt(14519475950))
        return 976;
        if(checkExp>=BigInt(14459475950))
        return 975;
        if(checkExp>=BigInt(14399475950))
        return 974;
        if(checkExp>=BigInt(14339475950))
        return 973;
        if(checkExp>=BigInt(14279475950))
        return 972;
        if(checkExp>=BigInt(14219475950))
        return 971;
        if(checkExp>=BigInt(14159475950))
        return 970;
        if(checkExp>=BigInt(14099475950))
        return 969;
        return 968;
        }
        if(checkExp<=BigInt(15359475950))
        {
        if(checkExp>=BigInt(15359475950))
        return 990;
        if(checkExp>=BigInt(15299475950))
        return 989;
        if(checkExp>=BigInt(15239475950))
        return 988;
        if(checkExp>=BigInt(15179475950))
        return 987;
        if(checkExp>=BigInt(15119475950))
        return 986;
        if(checkExp>=BigInt(15059475950))
        return 985;
        if(checkExp>=BigInt(14999475950))
        return 984;
        if(checkExp>=BigInt(14939475950))
        return 983;
        if(checkExp>=BigInt(14879475950))
        return 982;
        if(checkExp>=BigInt(14819475950))
        return 981;
        if(checkExp>=BigInt(14759475950))
        return 980;
        return 979;
        }

        if(checkExp>=BigInt(15959475950))
        return 1000;
        if(checkExp>=BigInt(15899475950))
        return 999;
        if(checkExp>=BigInt(15839475950))
        return 998;
        if(checkExp>=BigInt(15779475950))
        return 997;
        if(checkExp>=BigInt(15719475950))
        return 996;
        if(checkExp>=BigInt(15659475950))
        return 995;
        if(checkExp>=BigInt(15599475950))
        return 994;
        if(checkExp>=BigInt(15539475950))
        return 993;
        if(checkExp>=BigInt(15479475950))
        return 992;
        if(checkExp>=BigInt(15419475950))
        return 991;
        return 991;
    }

    /**
     * 通过经验获取用户等级
     *
     * @param level      当前等级
     * @param operateExp 操作的经验（已经*10000）
     * @return int
     */
    public static getUserExpToLevel(level: number, operateExp: bigint):number
    {
        let thisLevelExp = this.getUserLevelFullExp(level);
        let nextLevelExp = this.getUserLevelFullExp(level + 1);
        if (thisLevelExp + operateExp / this.expMultiple >= nextLevelExp)
        {
            return level + 1;
        }
        return level;
    }

    /**
     * 计算金币转为经验的比例
     *
     * @param gameCoin
     * @return int
     */
    public static calculationGameCoin2Exp(gameCoin: bigint): bigint
    {
        return gameCoin * BigInt(this.coin2exp);
    }

}
