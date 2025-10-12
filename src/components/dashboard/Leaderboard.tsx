import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { leaderboardUsers, LeaderboardUser } from '@/data/dashboard';

const Leaderboard: React.FC = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <motion.span
            className="text-xl font-bold text-yellow-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            1st
          </motion.span>
        );
      case 2:
        return (
          <motion.span
            className="text-xl font-bold text-gray-400"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            2nd
          </motion.span>
        );
      case 3:
        return (
          <motion.span
            className="text-xl font-bold text-orange-600"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            3rd
          </motion.span>
        );
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-yellow-500 bg-gradient-to-b from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 shadow-lg'; // Gold
      case 2:
        return 'border-gray-300 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 shadow-md'; // Silver
      case 3:
        return 'border-orange-600 bg-gradient-to-b from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 shadow-md'; // Bronze
      default:
        return 'border-border bg-card hover:bg-accent/5 dark:hover:bg-accent/10';
    }
  };

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {leaderboardUsers.slice(0, 3).map((user, index) => {
            const podiumOrder = [1, 0, 2]; // 2nd, 1st, 3rd for visual podium
            const podiumUser = leaderboardUsers[podiumOrder[index]];
            return (
              <motion.div
                key={podiumUser.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col items-center justify-between p-4 rounded-lg border ${getRankColor(podiumUser.rank)} hover:shadow-md transition-shadow h-40`}
              >
                <div className="flex flex-col items-center">
                  <Avatar className="h-12 w-12 mb-2">
                    <AvatarImage src={podiumUser.avatar} alt={podiumUser.name} />
                    <AvatarFallback>{podiumUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-medium text-foreground text-sm truncate max-w-full mb-1">{podiumUser.name}</h3>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {getRankIcon(podiumUser.rank)}
                    </div>
                    <span className="text-sm text-muted-foreground mb-2">{podiumUser.points} pts</span>
                    {podiumUser.badges.length > 0 && (
                      <div className="flex justify-center">
                        <Badge variant="default" className="text-xs bg-primary text-primary-foreground">
                          {podiumUser.badges[0]}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Rest of the Leaderboard (4-10) */}
        <div className="space-y-4">
          {leaderboardUsers.slice(3).map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index + 3) * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-lg border ${getRankColor(user.rank)} hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-center w-8">
                {getRankIcon(user.rank)}
              </div>

              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground truncate">{user.name}</h3>
                  <span className="text-sm text-muted-foreground">{user.points} pts</span>
                </div>

                {user.badges.length > 0 && (
                  <div className="flex gap-1 mb-2">
                    <Badge variant="default" className="text-xs bg-primary text-primary-foreground">
                      {user.badges[0]}
                    </Badge>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">Activity</span>
                      <span>{user.jobActivity}%</span>
                    </div>
                    <Progress value={user.jobActivity} className="h-1" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">Coding</span>
                      <span>{user.codingStats}%</span>
                    </div>
                    <Progress value={user.codingStats} className="h-1" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">Achievements</span>
                      <span>{user.achievements}</span>
                    </div>
                    <Progress value={(user.achievements / 15) * 100} className="h-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="font-medium text-primary">Your Rank: #3</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Keep applying to jobs and completing challenges to climb the leaderboard!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
