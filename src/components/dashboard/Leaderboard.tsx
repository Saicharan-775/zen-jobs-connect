import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Award, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { leaderboardUsers, type LeaderboardUser } from '@/data/dashboard';

const Leaderboard = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Award className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40 border-yellow-300 dark:border-yellow-700';
      case 2:
        return 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700/40 dark:to-gray-600/40 border-gray-300 dark:border-gray-600';
      case 3:
        return 'bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 border-amber-300 dark:border-amber-700';
      default:
        return 'bg-muted/30 border-border';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <span>Leaderboard</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto space-y-6 px-6 pb-6">
        {/* Top 3 Podium */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Top Performers
          </h3>
          <div className="space-y-2">
            {leaderboardUsers.slice(0, 3).map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-lg border ${getRankBadgeColor(user.rank)} hover:shadow-md transition-all`}
              >
                <div className="flex items-center justify-center w-8 flex-shrink-0">
                  {getRankIcon(user.rank)}
                </div>

                <Avatar className="h-10 w-10 border-2 border-background">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xs">{user.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm text-foreground truncate">{user.name}</h4>
                    {user.badges.length > 0 && (
                      <Badge variant="secondary" className="text-xs px-1.5 py-0">
                        {user.badges[0]}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{user.points} points</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rest of Leaderboard */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Other Rankings
          </h3>
          <div className="space-y-2">
            {leaderboardUsers.slice(3).map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index + 3) * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 hover:border-primary/20 transition-all"
              >
                <div className="flex items-center justify-center w-8 flex-shrink-0">
                  {getRankIcon(user.rank)}
                </div>

                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xs">{user.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-medium text-sm text-foreground truncate">{user.name}</h4>
                    <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">{user.points} pts</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Activity</span>
                        <span className="text-xs font-medium">{user.jobActivity}%</span>
                      </div>
                      <Progress value={user.jobActivity} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Coding</span>
                        <span className="text-xs font-medium">{user.codingStats}%</span>
                      </div>
                      <Progress value={user.codingStats} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Badges</span>
                        <span className="text-xs font-medium">{user.achievements}</span>
                      </div>
                      <Progress value={(user.achievements / 15) * 100} className="h-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Your Rank Card */}
        <div className="pt-2">
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-foreground mb-0.5">Your Rank: #3</h4>
                  <p className="text-xs text-muted-foreground">
                    Keep applying and completing challenges to climb higher!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;