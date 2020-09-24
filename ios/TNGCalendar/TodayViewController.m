//
//  TodayViewController.m
//  TNGCalendar
//
//  Created by Harry Bui on 8/7/20.
//

#import "TodayViewController.h"
#import <NotificationCenter/NotificationCenter.h>

@interface TodayViewController () <NCWidgetProviding, UITableViewDelegate, UITableViewDataSource>
@property (weak, nonatomic) IBOutlet UITableView *tabelView;
- (IBAction)buttonRefresh:(id)sender;

@end

@implementation TodayViewController
NSArray *calendars;
- (void)viewDidLoad {
    [super viewDidLoad];
    calendars = [NSArray new];
    // Do any additional setup after loading the view.
}

- (void)widgetPerformUpdateWithCompletionHandler:(void (^)(NCUpdateResult))completionHandler {
    //[self performData];
    completionHandler(NCUpdateResultNewData);
}

- (void)performData {
  NSString *url = @"http://appmobile.tng.vn:8082/toss/api/calendar/list?self=true&from=07/08/2020&to=14/08/2020&group=2";
  NSString *token = @"eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI3IiwiaWF0IjoxNTk2Nzk1MzY2LCJleHAiOjE1OTY4ODE3NjYsIklETWFOUyI6NTIyNywiVGVuQ2h1Y1Z1IjoiVOG7lW5nIGdpw6FtIMSR4buRYyIsIklEQ2hpTmhhbmgiOjI1LCJJRFBob25nQmFuIjo4NDksIk1hTlMiOiJUTkc1MDAxMDQiLCJNYUNodWNWdSI6NDUsIklEVXNlciI6N30.9CbSo8_GfPgXa6GkZW9zRdF4CEKZCwsRHk7gNyI5ms3IHesC9DETWHerk7BoTrRJ";
  NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
  [request setHTTPMethod:@"GET"];
  [request setValue:[NSString stringWithFormat: @"JWT %@", token] forHTTPHeaderField:@"Content-Length"];
  [request setURL:[NSURL URLWithString:url]];
  
  [[[NSURLSession sharedSession] dataTaskWithRequest:request completionHandler:
    ^(NSData * _Nullable data,
      NSURLResponse * _Nullable response,
      NSError * _Nullable error) {

        NSString *myString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
        NSLog(@"Data received: %@", myString);
  }] resume];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  static NSString *todayCell = @"todayCell";
  UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:todayCell];
  if (cell == nil) {
    cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:todayCell];
  }
  cell.textLabel.text = [NSString stringWithFormat:@"%@", indexPath];
  return cell;
}

- (NSInteger)tableView:(nonnull UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  return [calendars count];
}

- (IBAction)buttonRefresh:(id)sender {
  [self performData];
}
@end
